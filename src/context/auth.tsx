import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { load, newId, remove, save, sha256 } from "@/lib/storage";

// PROTOTYPE ONLY: accounts are kept in this browser's localStorage. A real
// build would swap these functions for calls to an auth service.

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextValue {
  user: User | null;
  signUp: (data: { name: string; email: string; phone: string; password: string }) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  updateProfile: (data: Pick<User, "name" | "phone">) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const normEmail = (e: string) => e.trim().toLowerCase();
const strip = ({ passwordHash: _hash, ...user }: StoredUser): User => user;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<StoredUser[]>(() => load<StoredUser[]>("users", []));
  const [sessionId, setSessionId] = useState<string | null>(() => load<string | null>("session", null));

  useEffect(() => save("users", users), [users]);
  useEffect(() => (sessionId ? save("session", sessionId) : remove("session")), [sessionId]);

  const signUp = useCallback<AuthContextValue["signUp"]>(
    async ({ name, email, phone, password }) => {
      const e = normEmail(email);
      if (users.some((u) => u.email === e)) throw new Error("An account with this email already exists. Log in instead.");
      const user: StoredUser = {
        id: newId("U"),
        name: name.trim(),
        email: e,
        phone: phone.trim(),
        createdAt: new Date().toISOString(),
        passwordHash: await sha256(e + ":" + password),
      };
      setUsers((prev) => [...prev, user]);
      setSessionId(user.id);
    },
    [users],
  );

  const logIn = useCallback<AuthContextValue["logIn"]>(
    async (email, password) => {
      const e = normEmail(email);
      const found = users.find((u) => u.email === e);
      if (!found || found.passwordHash !== (await sha256(e + ":" + password))) {
        throw new Error("That email and password don't match. Check them and try again.");
      }
      setSessionId(found.id);
    },
    [users],
  );

  const value = useMemo<AuthContextValue>(() => {
    const current = users.find((u) => u.id === sessionId);
    return {
      user: current ? strip(current) : null,
      signUp,
      logIn,
      logOut: () => setSessionId(null),
      updateProfile: ({ name, phone }) =>
        setUsers((prev) => prev.map((u) => (u.id === sessionId ? { ...u, name: name.trim(), phone: phone.trim() } : u))),
    };
  }, [users, sessionId, signUp, logIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

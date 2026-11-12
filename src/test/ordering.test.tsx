import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

// A Wednesday lunchtime, when the kitchen is open.
const OPEN_TIME = new Date(2026, 10, 11, 12, 0, 0);

function renderAt(path: string) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

async function signUp(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("tab", { name: "Sign up" }));
  await user.type(screen.getByLabelText("Full name"), "Thabo Mokoena");
  await user.type(screen.getByLabelText("Email"), "thabo@example.com");
  await user.type(screen.getByLabelText("Cellphone"), "072 123 4567");
  await user.type(screen.getByLabelText("Password"), "secret123");
  await user.click(screen.getByRole("button", { name: "Create account" }));
}

describe("ordering journey", { timeout: 30_000 }, () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(OPEN_TIME);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("adds to cart, signs up, checks out and shows the order", async () => {
    const user = userEvent.setup({ delay: null });
    renderAt("/menu");

    // Add a Buffet (R100) and two Oxtails (R120 each).
    await user.click(screen.getByRole("button", { name: "Add Buffet to cart" }));
    await user.click(screen.getAllByRole("button", { name: "Add Oxtail to cart" })[0]);
    await user.click(screen.getByRole("button", { name: "Add one more Oxtail" }));

    // Cart bar → drawer shows the right total.
    await user.click(screen.getByRole("button", { name: /view your order/i }));
    const drawer = await screen.findByRole("dialog");
    expect(within(drawer).getByText("3 items · freshly prepared to order")).toBeInTheDocument();
    expect(within(drawer).getByText("R340")).toBeInTheDocument();

    // Logged out, so checkout goes via sign up and comes back.
    await user.click(within(drawer).getByRole("button", { name: "Log in to Checkout" }));
    expect(await screen.findByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    await signUp(user);
    expect(await screen.findByRole("heading", { name: "Checkout" })).toBeInTheDocument();

    // Details are prefilled from the account.
    expect(screen.getByLabelText("Name")).toHaveValue("Thabo Mokoena");

    // Dine-in needs a table number.
    await user.click(screen.getByRole("radio", { name: /dine in/i }));
    await user.click(screen.getByRole("button", { name: "Place Order" }));
    expect(await screen.findByText("Tell us your table number.")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Table number"), "7");
    await user.type(screen.getByLabelText(/notes for the kitchen/i), "Pap with the oxtail");
    await user.click(screen.getByRole("button", { name: "Place Order" }));

    // Confirmation + tracking page.
    expect(await screen.findByText(/your order is in/i, {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText("Dine in · Table 7")).toBeInTheDocument();
    expect(screen.getByText("Pay at the table (cash or card)")).toBeInTheDocument();
    expect(screen.getByText("Pap with the oxtail")).toBeInTheDocument();
    expect(screen.getByText("R340")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel order" })).toBeInTheDocument();

    // The cart is emptied and the order is in the account history.
    await user.click(screen.getByRole("link", { name: "All your orders" }));
    expect(await screen.findByRole("heading", { name: "Your Orders" })).toBeInTheDocument();
    expect(screen.getByText("Order received")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /open cart, 0 items/i }).length).toBeGreaterThan(0);
  });

  it("rejects an invalid card and accepts a valid one", async () => {
    const user = userEvent.setup({ delay: null });
    renderAt("/menu");
    await user.click(screen.getByRole("button", { name: "Add Club Steak to cart" }));
    await user.click(screen.getAllByRole("button", { name: /open cart, 1 item/i })[0]);
    await user.click(within(await screen.findByRole("dialog")).getByRole("button", { name: "Log in to Checkout" }));
    await signUp(user);
    expect(await screen.findByRole("heading", { name: "Checkout" })).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: /pay now by card/i }));
    await user.type(screen.getByLabelText("Card number"), "4242424242424241");
    await user.type(screen.getByLabelText("Expiry"), "1230");
    await user.type(screen.getByLabelText("CVC"), "123");
    await user.click(screen.getByRole("button", { name: "Pay R90" }));
    expect(await screen.findByText("Check the card number.")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Card number"));
    await user.type(screen.getByLabelText("Card number"), "4242424242424242");
    await user.click(screen.getByRole("button", { name: "Pay R90" }));
    expect(await screen.findByText(/your order is in/i, {}, { timeout: 4000 })).toBeInTheDocument();
    expect(screen.getByText("Paid by card ending 4242")).toBeInTheDocument();
  });

  it("logs out, rejects a wrong password and logs back in", async () => {
    const user = userEvent.setup({ delay: null });
    renderAt("/login");
    await signUp(user);
    expect(await screen.findByRole("heading", { name: /hi, thabo/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /log out/i }));
    await waitFor(() => expect(window.location.pathname).toBe("/"));

    await user.click(screen.getAllByRole("link", { name: "Log in" })[0]);
    expect(await screen.findByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    await user.type(screen.getByLabelText("Email"), "THABO@example.com");
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByText(/don't match/i)).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Password"));
    await user.type(screen.getByLabelText("Password"), "secret123");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByRole("heading", { name: /hi, thabo/i })).toBeInTheDocument();
  });
});

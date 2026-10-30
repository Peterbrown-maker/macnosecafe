# Deployment to Vercel

This project is configured to be deployed on Vercel with zero-configuration required.

## Automatic Deployment

### Via Git Integration (Recommended)

1. Push your code to GitHub (or GitLab/Bitbucket)
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect the Vite configuration and build settings
6. Click "Deploy"

Your site will be live at a Vercel URL and will automatically redeploy on every push to main branch.

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# For production deployment
vercel --prod
```

## Configuration Files

The following files enable Vercel deployment:

- **vercel.json** - Specifies build command, output directory, and framework
- **.vercelignore** - Excludes unnecessary files from deployment

## Build Process

- **Build Command**: `npm run build` (generates production build in `dist/` folder)
- **Output Directory**: `dist/`
- **Framework**: Vite (automatically detected)

## Environment Variables

If your application requires environment variables:

1. In Vercel Dashboard: Project Settings → Environment Variables
2. Add your variables (e.g., `VITE_API_URL`, etc.)
3. They will be automatically injected during build

Note: Variables must be prefixed with `VITE_` to be accessible in the browser.

## Preview Deployments

Every pull request will automatically get a preview deployment URL, allowing you to test changes before merging to main.

## Production Domain

After successful deployment, you can connect a custom domain:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions provided by Vercel

## Troubleshooting

### Build Fails
- Check that `npm run build` works locally: `npm run build`
- Review build logs in Vercel Dashboard

### Dependencies Missing
- Ensure all dependencies are in `package.json` (not just devDependencies)
- Run `npm install` locally to verify

### Static Files Not Found
- All static assets should be in the `public/` directory
- Check that file paths in code match actual file locations

For more information, visit [Vercel Deployment Documentation](https://vercel.com/docs)

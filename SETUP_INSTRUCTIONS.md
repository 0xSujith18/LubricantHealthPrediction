# Setup Instructions

## Prerequisites Required

Node.js and npm are not installed on this system. To run the Lubricant Condition Predictor frontend, you need to install them first.

### Install Node.js and npm

1. **Download and install Node.js** from https://nodejs.org/
   - Choose the LTS version (recommended)
   - This will also install npm automatically

2. **Verify installation:**
   ```bash
   node --version
   npm --version
   ```

### Run the Application

Once Node.js and npm are installed:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   ./start.sh
   ```

3. **Open browser:**
   - Navigate to `http://localhost:5173`
   - The application will be running with hot reload

### Backend Requirements

The frontend expects a FastAPI backend running on `http://localhost:8000`. Make sure your backend is running before testing API functionality.

### Project Structure

The complete React TypeScript application is ready with:
- ✅ Modern UI with shadcn/ui components
- ✅ Dark industrial theme
- ✅ Form validation and tooltips
- ✅ Real-time predictions
- ✅ Model management
- ✅ Settings persistence
- ✅ Responsive design
- ✅ Professional animations

All source code is in the `src/` directory and ready to run once Node.js is installed.
# 🔧 Lubricant Condition Predictor Frontend

> **Professional AI-powered lubricant condition monitoring system with modern React frontend**

A production-ready React application for predicting lubricant condition using machine learning models. Features real-time predictions, model management, and comprehensive analytics dashboard.

![Dark Industrial Theme](https://img.shields.io/badge/Theme-Dark%20Industrial-0ea5e9)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.5-06b6d4)

## ✨ Features

### 📊 **Dashboard**
- Real-time prediction statistics and trends
- Interactive charts with Recharts
- Active model monitoring
- Recent predictions history
- Performance metrics visualization

### 🔮 **Predict**
- Comprehensive input form with validation
- Interactive tooltips for field explanations
- Real-time prediction with confidence scoring
- Historical trend analysis
- CSV export functionality
- Loading states and error handling

### 🧠 **Models**
- Model performance comparison with progress bars
- Active model highlighting
- CSV-based model retraining
- Detailed metrics (Accuracy, Precision, Recall, F1-Score)
- Model activation/switching

### ⚙️ **Settings**
- Machine configuration options
- Alert threshold customization
- Theme toggle (Dark/Light mode)
- Notification preferences with switches
- Persistent settings with localStorage

### ℹ️ **About**
- Visual workflow diagram
- Project methodology explanation
- Technology stack overview
- System architecture details

## 🚀 Tech Stack

| Technology | Version | Purpose |
|------------|---------|----------|
| **React** | 18.2.0 | Frontend framework |
| **TypeScript** | 5.2.2 | Type safety |
| **Vite** | 4.5.0 | Build tooling |
| **Tailwind CSS** | 3.3.5 | Styling |
| **Framer Motion** | 10.16.5 | Animations |
| **Recharts** | 2.8.0 | Data visualization |
| **Radix UI** | Latest | Accessible components |
| **Axios** | 1.6.2 | API communication |
| **React Router** | 6.20.1 | Navigation |

## 🎨 UI/UX Features

- **Dark Industrial Theme**: Professional charcoal/black backgrounds with cyan accents
- **Responsive Design**: Mobile-first approach with Tailwind utilities
- **Smooth Animations**: Page transitions and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Loading States**: Skeleton placeholders and spinners
- **Toast Notifications**: Success/error feedback
- **Form Validation**: Real-time input validation with error messages
- **Tooltips**: Contextual help for complex fields

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- FastAPI backend running on `http://localhost:8000`

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd lubricant-condition-predictor
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   # or use the provided script
   ./start.sh
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

### Environment Setup

The application expects a FastAPI backend at `http://localhost:8000`. Update the API base URL in `src/lib/api.ts` if needed.

## 🔌 API Integration

### Backend Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/predict` | Get lubricant condition prediction |
| `GET` | `/models` | List available ML models |
| `POST` | `/models/set` | Set active model |
| `GET` | `/history` | Get prediction history |
| `POST` | `/retrain` | Retrain active model |
| `POST` | `/retrain_csv` | Retrain model with CSV data |

### Error Handling
- Automatic error interceptors with toast notifications
- Graceful fallbacks with mock data for demo purposes
- Comprehensive logging for debugging

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   └── Layout.tsx       # Main layout with sidebar navigation
├── pages/
│   ├── Dashboard.tsx    # Analytics and overview
│   ├── Predict.tsx      # Prediction interface
│   ├── Models.tsx       # Model management
│   ├── Settings.tsx     # Configuration
│   └── About.tsx        # Project information
├── contexts/
│   └── ThemeContext.tsx # Theme management
├── lib/
│   ├── api.ts          # API client with Axios
│   ├── utils.ts        # Utility functions
│   ├── validation.ts   # Form validation
│   └── storage.ts      # localStorage utilities
└── types/
    └── index.ts        # TypeScript interfaces
```

## 🎯 Key Improvements

### Enhanced UX
- **Real-time Validation**: Instant feedback on form inputs
- **Progressive Enhancement**: Graceful degradation for offline use
- **Keyboard Navigation**: Full accessibility support
- **Mobile Responsive**: Optimized for all screen sizes

### Performance
- **Code Splitting**: Lazy loading for optimal bundle size
- **Memoization**: Optimized re-renders with React.memo
- **Efficient State**: Minimal re-renders with proper state management

### Developer Experience
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency
- **Hot Reload**: Instant development feedback
- **Component Library**: Reusable shadcn/ui components

## 🔧 Configuration

### Theme Customization
Update `tailwind.config.js` and `src/index.css` for custom color schemes.

### API Configuration
Modify `src/lib/api.ts` to change backend URL or add authentication.

### Build Configuration
Customize `vite.config.ts` for build optimizations and deployment settings.

## 📱 Responsive Design

- **Mobile**: Collapsible sidebar, touch-friendly controls
- **Tablet**: Optimized grid layouts, readable typography
- **Desktop**: Full sidebar navigation, multi-column layouts

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for industrial AI applications**
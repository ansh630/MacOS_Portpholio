import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("App render crashed:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen grid place-items-center p-6 text-center">
          <div>
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-sm opacity-80">
              A runtime error stopped rendering. Check the browser console for details.
            </p>
            <p className="mt-2 text-xs opacity-60">
              {this.state.error?.message || "Unknown error"}
            </p>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

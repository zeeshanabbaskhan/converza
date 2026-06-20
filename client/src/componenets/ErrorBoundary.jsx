import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App render error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="signupbody">
          <div className="mainsec" style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
            <h2>Something went wrong</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              The app hit an unexpected error. Try reloading the page.
            </p>
            <button type="button" onClick={this.handleReload}>
              Reload app
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

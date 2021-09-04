import React from 'react';
import EventsComponent from './features/events/Events';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <EventsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastNotification } from '@carbon/react';

interface NotificationContextType {
  addNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
  const [nextId, setNextId] = useState(1);

  const addNotification = (message: string) => {
    setNotifications(prev => [
      ...prev,
      { id: nextId, message }
    ]);
    setNextId(prevId => prevId + 1);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  return (
    <>
      <NotificationContext.Provider value={{ addNotification }}>
        {children}
        <div
          className="fixed bottom-0 left-0 w-[100%] p-4 pointer-events-none z-9999"
        >
          {notifications.map(notification => (
            <ToastNotification
              key={notification.id}
              kind="success"
              title="Success"
              subtitle={notification.message}
              style={{
                marginBottom: '0.5rem',
                width: 'calc(100% - 2rem)',
              }}
            />
          ))}
        </div>
      </NotificationContext.Provider>
    </>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

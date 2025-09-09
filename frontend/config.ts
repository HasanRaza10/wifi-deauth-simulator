// Application configuration
export const config = {
  appName: "Wi-Fi De-Authentication Tool",
  version: "1.0.0",
  description: "Educational cybersecurity simulation tool",
  author: "hasanraza6361@gmail.com",
  
  // Feature flags
  features: {
    newsIntegration: false, // Disabled to avoid API dependency
    realTimeUpdates: true,
    exportData: true,
    passwordSecurity: true,
  },
  
  // Demo configuration
  demo: {
    allowedEmailDomains: ["example.com"],
    defaultCredentials: {
      email: "user@example.com",
      password: "DevOnlyPassword!234",
    },
  },
  
  // UI configuration
  ui: {
    animationDuration: 300,
    toastDuration: 3000,
    refreshInterval: 15000, // 15 seconds for live updates
  },
};

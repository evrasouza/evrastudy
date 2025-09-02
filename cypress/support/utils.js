// Fixed desktop viewport configuration
export const desktopViewport = { label: 'Desktop FHD', width: 1920, height: 1080 };

// List of device viewports for testing (desktop, mobile, tablet)
export const devices = [
  { label: 'Desktop FHD', width: 1920, height: 1080 },
  { label: 'Small Phone', width: 320, height: 568 },
  { label: 'Phone', width: 375, height: 667 },
  { label: 'Large Phone', width: 390, height: 844 },
  { label: 'XL Phone', width: 414, height: 896 },
  { label: 'Small Tablet', width: 600, height: 1024 },
  { label: 'Tablet', width: 768, height: 1024 },
  { label: 'Large Tablet', width: 834, height: 1112 },
  { label: 'Max Mobile', width: 1024, height: 1366 }
];

// Utility function to return a random device from the list
export function getRandomDevice() {
  return devices[Math.floor(Math.random() * devices.length)];
}
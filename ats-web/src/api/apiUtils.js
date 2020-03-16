import { notification } from 'antd';

export async function handleResponse(response) {
  if (response.ok) return response.json();
  const error = await response.json();
  notification.open({
    message: 'Server Error',
    description: error.response,
    onClick: () => {
      console.log(error);
    },
  });
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  notification.open({
    message: 'Server Error',
    description: error.response,
    onClick: () => {
      console.log(error);
    },
  });
}

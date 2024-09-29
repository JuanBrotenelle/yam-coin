import { useUserStore } from '@/stores/Store';

export function applyResponseDataToStore(data: any) {
  const userStore = useUserStore();

  for (const [key, value] of Object.entries(data)) {
    if (key in userStore) {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (nestedKey in (userStore as any)[key]) {
            (userStore as any)[key][nestedKey] = nestedValue;
          }
        }
      } else {
        (userStore as any)[key] = value;
      }
    }
  }

  userStore.addAndSortReferal();
}

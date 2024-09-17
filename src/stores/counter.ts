import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

interface Bonus {
  _id: string;
  type: 'coins' | 'hourly_income' | 'multiplier';
  value: number;
  status: 'inactive' | 'used';
  receivedAt: string;
}
interface Gift {
  _id: string;
  type: 'coins' | 'hourly_income' | 'multiplier';
  title: string;
  photoUrl: string;
  value: number;
  status: 'inactive' | 'used';
}

interface Friend {
  _id: string;
  userId: number;
  firstName: string;
  lastName: string;
  photoUrl: string;
  isPremium: boolean;
}

export const useUserInfo = defineStore('userInfo', () => {
  const userId = ref(0);
  const userYams = ref(0.000);
  const userIncome = ref(0.000);
  const token = ref('');
  const referals = ref<Friend[]>([]);
  const bonuses = ref<{ default: Bonus[], gifts: Gift[] }>({
    default: [],
    gifts: [],
  });
  return { userYams, userIncome, token, bonuses, userId, referals };
});

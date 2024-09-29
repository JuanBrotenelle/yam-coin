import { defineStore } from 'pinia';

function displayComboElement(type: string) {
  switch (type) {
    case "trash": {
      const array = ["🍏", "🍎", "🗑️", "🦝", "🐼", "🔥"];
      const random = Math.floor(Math.random() * array.length);
      return array[random];
    }
    case "cherry": {
      return "🍒";
    }
    case "strawberry": {
      return "🍓";
    }
    case "banana": {
      return "🍌";
    }
    case "pineapple": {
      return "🍍";
    }
    case "yam": {
      return "🛆";
    }
    case "hamster": {
      return "🐹";
    }
  }
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    authToken: '',
    daysStreak: 0,
    game: {
      accountExperience: 0,
      comboLevel: 0,
      awayFromGame: 0,
      currentUserCoins: 0,
      currentUserIncome: 0,
      combo: [] as any[],
      bonuses: {
        gifts: [] as any[],
        tasks: [] as any[],
      },
    },
    referals: [] as any[],
    supportId: '',
    user: {
      userId: 0,
      isBot: false,
      firstName: '',
      lastName: '',
      username: '',
      photoUrl: '',
      isPremium: false,
      referalLink: '',
    },
  }),
  actions: {
    setAuthToken(token: string) {
      this.authToken = token;
    },
    setUserData(data: any) {
      this.authToken = data.authToken;
      this.daysStreak = data.daysStreak;
      this.game = data.game;
      this.referals = data.referals;
      this.supportId = data.supportId;
      this.user = data.user;
    },
    addAndSortReferal() {
      const UserObject = {
        userId: this.user.userId,
        firstName: "You",
        lastName: "",
        photoUrl: this.user.photoUrl,
        isPremium: this.user.isPremium,
        totalReferalCoins: this.game.currentUserCoins,
        accountExperience: this.game.accountExperience,
        _id: "84732647236746823687468723"
      };

      this.referals.push(UserObject);

      this.referals.sort((a, b) => b.accountExperience - a.accoutExperience);
    },

    modifyComboArray() {
      const currentCombo = this.game.combo;
      currentCombo.forEach((element) => {
        element.status = "inactive";
        element.display = displayComboElement(element.type);
      });
    }
  },
  persist: {
    storage: localStorage,
    key: 'userStore',
  },
});

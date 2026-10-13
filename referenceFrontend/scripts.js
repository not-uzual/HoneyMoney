import { signUp, login, getUserData
  , createTransaction, getTransactions
} from "./apiCalls.js";

import { formatCurrency, buildTransactionCard,
  getTransactionVisual, formatTransactionData
} from "./utils.js";



const state = loadStateFromLocalStorage() || {
  todaySpent: 0,
  monthlyCredit: 0,
  monthlyDebit: 0,
  selectedType: "DEBIT",
  selectedDebitCategory: "General",
  selectedCreditCategory: "Company",
  transactions: [],
};

let userData = await getUserData();
console.log('User data retrieved:', userData);

const phones = document.querySelectorAll(".phone");

const renderWalletSummary = () => {
  document.querySelectorAll('[data-role="balance"]').forEach((element) => {
    element.textContent = formatCurrency(userData.balance);
  });

  document.querySelectorAll('[data-role="today-spent"]').forEach((element) => {
    element.textContent = formatCurrency(state.todaySpent);
  });

  document.querySelectorAll('#m-credit').forEach((element) => {
      element.textContent = formatCurrency(state.monthlyCredit);
  });

  document.querySelectorAll('#m-debit').forEach((element) => {
    element.textContent = formatCurrency(state.monthlyDebit);
  });
};

const renderTransactions = async () => {
  const transactions = await getTransactions();
  state.transactions = formatTransactionData(transactions);
  document.querySelectorAll('[data-role="transactions"]').forEach((list) => {
    list.innerHTML = "";
    state.transactions.forEach((transaction) => {
      list.appendChild(buildTransactionCard(transaction));
    });
  });
};

const updateRecentToggleLabels = () => {
  document.querySelectorAll('[data-action="toggle-transactions"]').forEach((button) => {
    const activity = button.closest(".activity");
    const list = activity?.querySelector('[data-role="transactions"]');
    const expanded = list?.classList.contains("is-expanded");

    button.textContent = expanded ? "Show less" : "See all";
  });
};

const setActivePanel = (phone, targetPanel) => {
  const panels = phone.querySelectorAll("[data-panel]");
  const navButtons = phone.querySelectorAll("[data-target-panel]");

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === targetPanel);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("nav-active", button.dataset.targetPanel === targetPanel);
  });

  saveStateToLocalStorage();
};

const resetTransactionForm = (form) => {
  state.selectedType = "DEBIT";
  state.selectedDebitCategory = "General";
  state.selectedCreditCategory = "Company";

  form.reset();

  form.querySelectorAll(".type-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.type === state.selectedType);
  });

  const debitCategoryValue = form.querySelector('[data-role="debit-category-value"]');
  if (debitCategoryValue) {
    debitCategoryValue.value = state.selectedDebitCategory;
  }

  const creditCategoryValue = form.querySelector('[data-role="credit-category-value"]');
  if (creditCategoryValue) {
    creditCategoryValue.value = state.selectedCreditCategory;
  }

  form.querySelectorAll('[data-role="debit-category-picker"] .category-chip').forEach((button) => {
    button.classList.toggle("active", button.dataset.category === state.selectedDebitCategory);
  });

  form.querySelectorAll('[data-role="credit-category-picker"] .category-chip').forEach((button) => {
    button.classList.toggle("active", button.dataset.category === state.selectedCreditCategory);
  });

  syncFormMode(form);
};

const syncFormMode = (form) => {
  const debitCategoryField = form.querySelector('[data-role="debit-category-picker"]')?.closest("label");
  const creditCategoryField = form.querySelector('[data-role="credit-category-picker"]')?.closest("label");

  const incomeMode = state.selectedType === "CREDIT";

  debitCategoryField?.classList.toggle("is-hidden", incomeMode);
  creditCategoryField?.classList.toggle("is-hidden", !incomeMode);
};

phones.forEach((phone) => {
  phone.querySelectorAll("[data-target-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      setActivePanel(phone, button.dataset.targetPanel);
    });
  });

  phone.querySelectorAll('[data-action="refresh"]').forEach((button) => {
    button.addEventListener("click", () => {
      button.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(360deg)" },
        ],
        {
          duration: 420,
          easing: "ease",
        }
      );
    });
  });

  phone.querySelectorAll('[data-action="toggle-transactions"]').forEach((button) => {
    button.addEventListener("click", () => {
      const activity = button.closest(".activity");
      const list = activity?.querySelector('[data-role="transactions"]');

      if (!list) {
        return;
      }

      list.classList.toggle("is-expanded");
      updateRecentToggleLabels();
    });
  });
});

document.querySelectorAll('[data-role="debit-category-picker"]').forEach((picker) => {
  picker.querySelectorAll(".category-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const form = picker.closest("form");
      const categoryValue = form?.querySelector('[data-role="category-value"]');

      state.selectedDebitCategory = button.dataset.category;

      picker.querySelectorAll(".category-chip").forEach((chip) => {
        chip.classList.toggle("active", chip === button);
      });

      if (categoryValue) {
        categoryValue.value = state.selectedDebitCategory;
      }
    });
  });
});

document.querySelectorAll('[data-role="credit-category-picker"]').forEach((picker) => {
  picker.querySelectorAll(".category-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const form = picker.closest("form");
      const categoryValue = form?.querySelector('[data-role="credit-category-value"]');

      state.selectedCreditCategory = button.dataset.category;

      console.log(state.selectedCreditCategory);
      

      picker.querySelectorAll(".category-chip").forEach((chip) => {
        chip.classList.toggle("active", chip === button);
      });



      if (categoryValue) {
        categoryValue.value = state.selectedCreditCategory;
      }
    });
  });
});

document.querySelectorAll('[data-role="transaction-form"]').forEach((form) => {
  syncFormMode(form);

  form.querySelectorAll(".type-btn").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedType = button.dataset.type;

      form.querySelectorAll(".type-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      syncFormMode(form);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = form.querySelector('[data-role="title"]')?.value.trim();
    const amount = Number(form.querySelector('[data-role="amount"]')?.value);

    if (amount <= 0) {
      return;
    }

    const isCredit = state.selectedType === "CREDIT";
    const debitCategory = state.selectedDebitCategory;
    const creditCategory = state.selectedCreditCategory;

    const transactionCategory = isCredit ? creditCategory : debitCategory;

    const transactionData = {
      title,
      type: state.selectedType,
      category: transactionCategory,
      amount,
    };

    createTransaction(transactionData);
    const transactions = await getTransactions();
    console.log('Transactions retrieved:', transactions);
    renderTransactionSummary(transactions);
    
    state.transactions = formatTransactionData(transactions);

    userData = await getUserData();
    renderWalletSummary();
    await renderTransactions();
    updateRecentToggleLabels();
    resetTransactionForm(form);

    alert("Transaction added successfully!");
  });
});

document.querySelectorAll('.auth-phone').forEach((phone) => {
  const authButtons = phone.querySelectorAll('[data-auth-mode]');
  const authForms = phone.querySelectorAll('[data-auth-form]');

  const setAuthMode = (mode) => {
    authButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.authMode === mode);
    });

    authForms.forEach((form) => {
      form.classList.toggle('is-active', form.dataset.authForm === mode);
    });
  };

  authButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setAuthMode(button.dataset.authMode);
    });
  });

  authForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let lis = document.querySelectorAll('.auth-form.is-active input')

      const userData = {};
      lis.forEach((input) => {
        userData[input.name] = input.value;
      });
      
      if (form.dataset.authForm === 'signup') {
        const {confirm_password, ...filteredUserData} = userData
        
        signUp(filteredUserData)
      }
      else if (form.dataset.authForm === 'login') {
        login(userData)
      }
      alert(form.dataset.authForm === 'login' ? 'Logged in successfully!' : 'Account created successfully!');
    });
  });
});


renderWalletSummary();
await renderTransactions();
updateRecentToggleLabels();


function renderProfileData() {
  const profileIcon = document.querySelectorAll('[data-target-panel="profile"]');
  const profileName = document.querySelectorAll('#profile-name');
  const profileUsername = document.querySelectorAll('#profile-username');
  const profileAvatar = document.querySelectorAll('#profile-avatar');

  if (userData) {
    profileName.forEach((name) => {
      name.innerText = userData.name;
    });
    profileUsername.forEach((username) => {
      username.textContent = `@${userData.username}`;
    });
    profileAvatar.forEach((avatar) => {
      avatar.textContent = userData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    });
    profileIcon.forEach((icon) => {
      if (icon.classList.contains('nav-btn'));
      else icon.textContent = userData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    });
  }
}

renderProfileData();

function renderTransactionSummary(transactions) {
  const monthlyCredit = 
    transactions.filter(t => t.type === "CREDIT")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyDebit = 
    transactions.filter(t => t.type === "DEBIT")
    .reduce((sum, t) => sum + t.amount, 0);

    const today = new Date().toISOString().split('T')[0];
    const todaySpent = 
      transactions.filter(t => t.type === "DEBIT" && t.created_at.startsWith(today))
      .reduce((sum, t) => sum + t.amount, 0);

    state.todaySpent = todaySpent;
    state.monthlyCredit = monthlyCredit;
    state.monthlyDebit = monthlyDebit;

    saveStateToLocalStorage();
}

function saveStateToLocalStorage() {
  localStorage.setItem('appState', JSON.stringify(state));
}

function loadStateFromLocalStorage() {
  const savedState = localStorage.getItem('appState');
  if (savedState) {
    return JSON.parse(savedState);
  }
}






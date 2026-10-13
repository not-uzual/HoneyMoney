export const formatCurrency = (value) => `₹${value?.toLocaleString("en-IN")}`;

export const buildTransactionCard = (transaction) => {
  const article = document.createElement("article");
  article.className = "transaction";

  article.innerHTML = `
    <div class="transaction-info">
      <span class="icon ${transaction.iconClass}">${transaction.icon}</span>
      <div>
        <h4>${transaction.title}</h4>
        <p>${transaction.timeLabel} · ${transaction.category}</p>
      </div>
    </div>
    <strong class="${transaction.type === "CREDIT" ? "credit" : "debit"}">
      ${transaction.type === "CREDIT" ? "+" : "-"} ${formatCurrency(transaction.amount)}
    </strong>
  `;

  return article;
};

export const getTransactionVisual = (type, category) => {
  if (type === "CREDIT") {
    return { icon: "💸", iconClass: "salary" };
  }

  if (category === "Shopping") {
    return { icon: "🛍️", iconClass: "coffee" };
  }

  if (category === "Travel") {
    return { icon: "✈️", iconClass: "salary" };
  }

  return { icon: "🧾", iconClass: "grocery" };
};

export function formatTransactionData(transactions) {
  return transactions.map((transaction) => {
      const visual = getTransactionVisual(transaction.type, transaction.category);
      return { ...transaction,
        ...visual ,
        timeLabel: new Date(transaction.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });
}
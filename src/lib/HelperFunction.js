export function formatStatus(statusValue) {
    if (!statusValue) return '';
    return statusValue.charAt(0).toUpperCase() + statusValue.slice(1);
}

export function formatDate(dateValue) {
    if (!dateValue) return '';
    const date = new Date(dateValue);
    //return date.toLocaleDateString();
    return date.toLocaleString();
}

export function formatAmount(amountValue) {
    return amountValue != null && amountValue !== ''
        ? `₱${Number(amountValue).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`
        : '';
}
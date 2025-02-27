function convertKgToLb() {
    const kg = parseFloat(document.getElementById('kg').value);
    const lb = kg * 2.20462;

    document.getElementById('convertKgToLb').innerText = `${lb} lb`;
}

function convertLbToKg() {
    const lb = parseFloat(document.getElementById('lb').value);
    const kg = lb / 2.20462;

    document.getElementById('convertLbtoKg').innerText = `${kg.toFixed(2)} kg`;
}
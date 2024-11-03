document.getElementById('fetch-data').addEventListener('click', async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    document.getElementById('data').innerHTML = JSON.stringify(data, null, 2);
});

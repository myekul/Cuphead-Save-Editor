document.getElementById('downloadButton').addEventListener('click', function () {
    const modifiedFile = modifyLevels(fileContents);
    downloadFile(modifiedFile, fileName);
});
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-links li');
    const tabContent = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            tabs.forEach(item => item.classList.remove('active'));
            tabContent.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            const activeTab = tab.querySelector('a').getAttribute('href');
            document.querySelector(activeTab).classList.add('active');
        });
    });
});
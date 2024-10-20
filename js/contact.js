document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Google Sheets API URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycby-C5BDWw-96DyStwKeEpBJxyRtNxYgjixPHue-cBzjX-7tL6ht5JGeMcTufMBWNoyRTQ/exec';
  
    const formData = new FormData();
    formData.append('fname', name);
    formData.append('lname', lastname)
    formData.append('email', email);
    formData.append('message', message);
  
    fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(response => {
        document.getElementById('statusMessage').textContent = 'Message sent successfully!';
        document.getElementById('contactForm').reset();
      })
      .catch(error => {
        document.getElementById('statusMessage').textContent = 'Error sending message.';
        console.error('Error!', error.message);
      });
  });
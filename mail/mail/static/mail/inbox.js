document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  // Send Email Event Handler
  document.querySelector('#compose-form').addEventListener('submit', send_email);
});

function send_email(event) {
  event.preventDefault();
  // Async POST request to submit the email
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === undefined) {
      throw new Error(`${data.error}`);
    }
    // Redirect to sent mailbox
    load_mailbox('sent');
  })
  .catch(error => {
      // Alert user of the error
      alert(`Email not sent: ${error.message}`);
  });
}

// Toggles into compose-view
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#read_email-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


// Toggles into emails-view
function load_mailbox(mailbox) {

  const emailsView = document.querySelector('#emails-view');
  // Show the mailbox and hide other views
  emailsView.style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#read_email-view').style.display = 'none';

  // Empty emails-view 
  emailsView.innerHTML = '';

  // Show the mailbox title
  const title = document.createElement("h3");
  title.textContent = `${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`;
  emailsView.appendChild(title);

  // Fetch call to obtain the list of the emails in the mailbox (in JSON form) through the API
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(data => {
    if (data.error !== undefined) {
      throw new Error(`${data.error}`);
    }
    // Parse JSON and display each mail as a div
    for (let email of data) {
      // Create a div for each email and append it to emails-view.
      const emailDiv = document.createElement('div');
      emailDiv.innerHTML = `
      <section>From: ${email.sender}</section> 
      <section>${email.subject}</section> 
      <section>${email.timestamp}</section>`;
      emailDiv.className = 'email_preview';

      // data attribute for use in read_email event
      emailDiv.dataset.email_id = email.id; 
      
      // Styles for read/unread emails
      if (email.read === false) {
        emailDiv.style.backgroundColor = 'white';
        emailDiv.style.fontWeight = 'bold';
      }
      else {
        emailDiv.style.backgroundColor = '#f2f2f2';
        emailDiv.style.fontWeight = 'normal';
      }

      // Add event listener to read each email
      emailDiv.addEventListener('click', read_email);

      // Append email to view
      emailsView.append(emailDiv);
    }
  })
  .catch(error => {
    const errorPara = document.createElement('p');
    errorPara.textContent = `${error}`;
    emailsView.prepend(errorPara);
  });
}

// Toggles into read_email-view
function read_email(event) {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  const readView = document.querySelector('#read_email-view');
  readView.style.display = 'block';

  readView.innerHTML = '';

  // Fetch the email to read
  fetch(`/emails/${event.currentTarget.dataset.email_id}`)
  .then(response => response.json())
  .then(email => {

    // Parse JSON object
    const sender = email.sender;
    const recipients = email.recipients;
    const timestamp = email.timestamp;
    const subject = email.subject;
    const body = email.body;

    // Display email content
    const emailDiv = document.createElement('div');
    emailDiv.className = 'email_read';
    emailDiv.innerHTML = `
    <div class="title">
      <h3>${subject}</h3>
      <small class="timestamp">${timestamp}</small>
    </div>
    <h6><b>${sender}</b></h6>
    <p><small>To: ${recipients}</small></p>
    <p>${body}</p>`;
    readView.append(emailDiv);

    // Add archive/reply buttons and their functionality

    // Create buttons
    const ar_button = document.createElement('button');
    const re_button = document.createElement('button');

    // Modify archive button
    ar_button.className = 'btn btn-sm btn-outline-secondary';
    if (email.archived === true) {
      ar_button.innerHTML = 'Unarchive';
    }
    else {
      ar_button.innerHTML = 'Archive';
    }

    // Modify reply button
    re_button.className = 'btn btn-sm btn-outline-secondary';
    re_button.innerHTML = 'Reply';


    // Add click events to buttons
    ar_button.addEventListener('click', function () {
       archive(email.id, email.archived);
    })

    re_button.addEventListener('click', () => reply(email));

    // Append buttons to read-email_view
    const user = document.querySelector('#user').textContent;
    if (email.sender !== user) {
      readView.append(ar_button);
    }
    readView.append('\n');
    readView.append(re_button);
    
    // Mark email as read through the API
    fetch(`/emails/${email.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        read: true
      })
    })
    .catch(error => {
      alert(`Email couldn't be marked as read: ${error.message}`);
    });
  })
  .catch(error => {
    const errorPara = document.createElement('p');
    errorPara.textContent = `${error}`;
    readView.prepend(errorPara);
  });
}


// Archive button Event Handler
function archive(id, is_archived) {
  if (is_archived === false) {
    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        archived: true
      })
    })
    .then(() => load_mailbox('inbox'))
    .catch(error => {
      alert(`${error}`);
    });
  }
  else {
    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        archived: false
      })
    })
    .then(() => load_mailbox('inbox'))
    .catch(error => {
      alert(`${error}`);
    });
  }
}

// Reply button Event Handler
function reply(email) {
  // Show compose-view, hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#read_email-view').style.display = 'none';

  document.querySelector('#compose-recipients').value = email.sender;
  if (email.subject.slice(0, 3) === 'Re:') {
    document.querySelector('#compose-subject').value = email.subject;
  }
  else {
    document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
  }
  document.querySelector('#compose-body').value = `On ${email.timestamp}, ${email.sender} wrote: "${email.body}"`;
}

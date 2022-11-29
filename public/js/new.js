const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#content').value;
  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard');
  };
  
  document.querySelector('#submit-new-post').addEventListener('submit', newFormHandler);
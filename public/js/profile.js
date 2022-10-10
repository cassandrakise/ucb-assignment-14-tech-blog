const newBlogHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#blog-name').value.trim();
    const description = documenent.querySelector('#blog-desc').value.trim();

    if (name && description) {
        const response = await fetch(`/api/blog`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to create blog!');
    }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target(getAttribute('data-id'));

        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete project!');
        }
    }
};

document
    .querySelector('.new-blog-post')
    .addEventListener('submit', newBlogHandler);

document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);
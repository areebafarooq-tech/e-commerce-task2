// Header, Newsletter, and Footer 
fetch('header-footer-newsletter.html')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Extract and insert the header
        const headerContent = doc.querySelector('header').innerHTML;
        document.querySelector('header').innerHTML = headerContent;

        // Extract and insert the newsletter
        const newsletterContent = doc.querySelector('.mailing-list')?.innerHTML;
        if (newsletterContent) {
            document.querySelector('.mailing-list').innerHTML = newsletterContent;
        }

        // Extract and insert the footer
        const footerContent = doc.querySelector('footer').innerHTML;
        document.querySelector('footer').innerHTML = footerContent;
    })
    .catch(error => console.error('Error loading header, newsletter, and footer:', error));
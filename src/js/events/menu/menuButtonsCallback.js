export function handleMenuButtonEvent(event) {
    console.log('Menu button clicked:', event.target);
    const button = event.target;
    const aBalise = button.getElementsByTagName('a')[0];
    if (aBalise) {
        aBalise.click();
    }
}

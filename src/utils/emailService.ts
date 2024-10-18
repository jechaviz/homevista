import { toast } from 'react-toastify';

// In a real application, you would integrate with an email service provider
// For this demo, we'll simulate email sending with console logs and toasts

export const sendEmail = (to: string, subject: string, body: string) => {
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  toast.success(`Email sent to ${to}`);
};

export const sendWelcomeEmail = (email: string) => {
  const subject = 'Welcome to HomeVista!';
  const body = `
    Dear Customer,

    Welcome to HomeVista! We're excited to have you join our community of home decor enthusiasts.

    Start exploring our wide range of products and services to transform your living space.

    Best regards,
    The HomeVista Team
  `;
  sendEmail(email, subject, body);
};

export const sendOrderConfirmation = (email: string, orderId: string) => {
  const subject = `Order Confirmation - Order #${orderId}`;
  const body = `
    Dear Customer,

    Thank you for your order! We're pleased to confirm that we've received your order #${orderId}.

    We'll send you another email when your order has been shipped.

    Best regards,
    The HomeVista Team
  `;
  sendEmail(email, subject, body);
};

export const sendShippingNotification = (email: string, orderId: string, trackingNumber: string) => {
  const subject = `Your Order Has Been Shipped - Order #${orderId}`;
  const body = `
    Dear Customer,

    Great news! Your order #${orderId} has been shipped.

    Tracking Number: ${trackingNumber}

    You can use this tracking number to follow your package's journey.

    Best regards,
    The HomeVista Team
  `;
  sendEmail(email, subject, body);
};

export const sendSubscriptionConfirmation = (email: string) => {
  const subject = 'Subscription Confirmed - HomeVista Newsletter';
  const body = `
    Dear Subscriber,

    Thank you for subscribing to the HomeVista newsletter!

    You'll now receive our latest updates, exclusive offers, and home decor inspiration directly in your inbox.

    Best regards,
    The HomeVista Team
  `;
  sendEmail(email, subject, body);
};
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId } = req.body;

    // Validate priceId
    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId' });
    }

    // Create checkout session for embedded checkout
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${req.headers.origin}/services/thank-you/?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: false },
    });

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
};

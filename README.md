# India + USA Fund Investment App

Research and portfolio-intelligence app for Indian and US funds, focused on discovery, comparison, fund research, manual portfolio tracking, India/USA allocation, calculators, watchlists, and transparent explanations.

## MVP

- Home dashboard
- Fund discovery and filters
- Fund details / research
- Compare 2–4 funds side by side
- Manual portfolio tracking
- India + USA global portfolio view
- Watchlists and alerts

## Product principles

- Transparency
- Accuracy
- Simplicity
- Data quality
- User control
- Clear explanations
- Security

The MVP is for research and portfolio tracking, not brokerage or trading.

## Architecture direction

Client → API/backend → financial data layer → fund database → portfolio database → market/FX data → analytics → AI explanation layer.

Financial calculations should remain separate from the AI explanation layer so generated text cannot invent portfolio numbers.

## Next steps

See the product requirements supplied with this project for the detailed functional, data, security, compliance, and roadmap requirements.

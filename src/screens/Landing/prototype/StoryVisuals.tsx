import type { StoryVisualId } from '@/screens/Landing/prototype/storyData'

/** Compact, realistic product mockups for the homepage carousel. */
export function StoryVisual({ type }: { type: StoryVisualId }) {
  switch (type) {
    case 'ai-atm':
      return (
        <div className="prod prod-atm">
          <div className="atm-body">
            <div className="atm-bezel">
              <div className="atm-screen">
                <span className="atm-brand">Tayseer ATM</span>
                <strong>Insert card</strong>
                <em>Cash · Balance · Transfer</em>
              </div>
            </div>
            <div className="atm-slot" />
            <div className="atm-pad">
              <i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="atm-cash" />
          </div>
        </div>
      )
    case 'wallet':
      return (
        <div className="prod prod-wallet">
          <div className="wallet-stack">
            <div className="wallet-card c-navy">
              <span>Tayseer Pay</span>
              <strong>•••• 8842</strong>
              <em>Debit</em>
            </div>
            <div className="wallet-card c-sand">
              <span>Multi-currency</span>
              <strong>SAR 12,540</strong>
              <em>Available</em>
            </div>
          </div>
          <div className="wallet-phone">
            <div className="wallet-phone-ui">
              <small>Pay</small>
              <b>Tap to pay</b>
            </div>
          </div>
        </div>
      )
    case 'core':
      return (
        <div className="prod prod-core">
          <div className="core-panel">
            <header>
              <span>Core ledger</span>
              <i />
            </header>
            <ul>
              <li>
                <span>Accounts</span>
                <b>Live</b>
              </li>
              <li>
                <span>Payments</span>
                <b>OK</b>
              </li>
              <li>
                <span>Settlements</span>
                <b>OK</b>
              </li>
              <li>
                <span>Risk</span>
                <b>Watch</b>
              </li>
            </ul>
          </div>
        </div>
      )
    case 'assistant':
      return (
        <div className="prod prod-assistant">
          <div className="assist-phone">
            <div className="assist-bar">Fahim · Assistant</div>
            <div className="assist-msg them">
              Can I move SAR 2,000 to savings?
            </div>
            <div className="assist-msg me">
              Done. Transfer cleared in 0.4s.
            </div>
            <div className="assist-msg them soft">Show recent fraud alerts</div>
          </div>
        </div>
      )
    case 'network':
      return (
        <div className="prod prod-network">
          <div className="net-board">
            <div className="net-city left">
              <i />
              <span>Riyadh</span>
            </div>
            <div className="net-city right">
              <i />
              <span>Dubai</span>
            </div>
            <div className="net-link" />
            <div className="net-hub">
              <strong>Network</strong>
              <small>Connected</small>
            </div>
          </div>
        </div>
      )
    case 'ecosystem':
    default:
      return (
        <div className="prod prod-ecosystem">
          <div className="eco-phone">
            <div className="eco-status">
              <span>9:41</span>
              <span>MBuke</span>
            </div>
            <div className="eco-balance">
              <small>Available balance</small>
              <strong>AED 48,290</strong>
            </div>
            <div className="eco-actions">
              <b>Send</b>
              <b>Cards</b>
              <b>Pay</b>
            </div>
            <div className="eco-list">
              <span>Salary · ADCB</span>
              <em>+12,500</em>
            </div>
            <div className="eco-list">
              <span>Card · Carrefour</span>
              <em>−186</em>
            </div>
          </div>
          <div className="eco-chip cards">Cards</div>
          <div className="eco-chip pay">Payments</div>
        </div>
      )
  }
}

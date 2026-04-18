import { useState } from "react"

function ContactForm() {

  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = import.meta.env.VITE_FORMSPREE_URL
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      if (response.ok) {
        alert("Message envoyé")
      } else {
        alert("Erreur lors de l'envoi")
      }
    } catch {
      alert("Erreur réseau")
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <div className="form-field">
        <label className="form-label" htmlFor="cf-name">Nom</label>
        <input
          id="cf-name"
          type="text"
          name="name"
          placeholder="Votre nom"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          type="email"
          name="email"
          placeholder="Votre email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field form-field--grow">
        <label className="form-label" htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          placeholder="Votre message..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Envoyer le message</button>

    </form>
  )
}

export default ContactForm

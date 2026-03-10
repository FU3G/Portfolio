import { useState } from "react"

function ContactForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    const url = import.meta.env.VITE_FORMSPREE_URL

    try {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        alert("Message envoyé")
      } else {
        alert("Erreur lors de l'envoi")
      }

    } catch (error) {
      alert("Erreur réseau")
    }

  }

  return (

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Nom"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <select
        name="subject"
        value={form.subject}
        onChange={handleChange}
      >
        <option value="">Sujet</option>
        <option value="opportunity">Opportunité</option>
        <option value="question">Question</option>
        <option value="collaboration">Collaboration</option>
        <option value="other">Autre</option>
      </select>

      <textarea
        name="message"
        placeholder="Votre message..."
        value={form.message}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Envoyer
      </button>

    </form>

  )
}

export default ContactForm
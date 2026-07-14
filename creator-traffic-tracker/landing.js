const form = document.querySelector("#waitlistForm");
const message = document.querySelector("#waitlistMessage");

async function loadWaitlistStats() {
  try {
    const response = await fetch("/api/waitlist/stats");
    const data = await response.json();
    if (data.count > 0) {
      message.textContent = `${data.count} creator${data.count === 1 ? "" : "s"} already on the early access list.`;
    }
  } catch {
    message.textContent = "No spam. Just beta access and product updates.";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = form.querySelector("button");
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.source = "landing";
  submit.disabled = true;
  submit.textContent = "Joining...";
  message.textContent = "Saving your early access request.";
  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not join waitlist.");
    message.textContent = `${data.message} You are #${data.count}.`;
    form.reset();
  } catch (error) {
    message.textContent = error.message;
  } finally {
    submit.disabled = false;
    submit.textContent = "Request early access";
  }
});

loadWaitlistStats();

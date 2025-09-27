document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const backButtons = document.querySelectorAll('.btn-back');
    const propertyTypeRadios = document.querySelectorAll('input[name="propertyType"]');

    let currentStep = 1;
    const totalSteps = 3;
    const formData = {};

    propertyTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const nextBtn = document.querySelector('.form-step[data-step="1"] .btn-next');
            if (nextBtn) {
                nextBtn.disabled = false;
            }
        });
    });

    function showStep(stepNumber) {
        formSteps.forEach(step => {
            step.classList.remove('active');
        });

        progressSteps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');

            if (stepNum === stepNumber) {
                step.classList.add('active');
            } else if (stepNum < stepNumber) {
                step.classList.add('completed');
            }
        });

        const currentFormStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        if (currentFormStep) {
            currentFormStep.classList.add('active');
        }

        currentStep = stepNumber;
    }

    function validateStep(stepNumber) {
        const currentFormStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);

        if (stepNumber === 1) {
            const selectedProperty = document.querySelector('input[name="propertyType"]:checked');
            return selectedProperty !== null;
        }

        if (stepNumber === 3) {
            const nameInput = currentFormStep.querySelector('#name');
            const phoneInput = currentFormStep.querySelector('#phone');
            const emailInput = currentFormStep.querySelector('#email');

            if (!nameInput.value.trim()) {
                nameInput.focus();
                return false;
            }

            if (!phoneInput.value.trim()) {
                phoneInput.focus();
                return false;
            }

            if (!emailInput.value.trim() || !emailInput.validity.valid) {
                emailInput.focus();
                return false;
            }

            return true;
        }

        return true;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    showStep(currentStep + 1);
                }
            }
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateStep(3)) {
            return;
        }

        const submitButton = form.querySelector('.btn-submit');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        const propertyType = document.querySelector('input[name="propertyType"]:checked').value;
        const details = document.getElementById('details').value.trim();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        const webhookData = {
            propertyType: propertyType,
            details: details || 'No additional details provided',
            name: name,
            phone: phone,
            email: email,
            submittedAt: new Date().toISOString(),
            source: window.location.href
        };

        try {
            const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY1MDYzMTA0MzE1MjZhNTUzZDUxMzci_pc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(webhookData)
            });

            if (response.ok) {
                formSteps.forEach(step => step.classList.remove('active'));
                const successStep = document.querySelector('.form-step[data-step="success"]');
                if (successStep) {
                    successStep.classList.add('active');
                }

                progressSteps.forEach(step => {
                    step.classList.add('completed');
                    step.classList.remove('active');
                });

                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Sorry, there was an error submitting your request. Please try calling us directly at (913) 206-4119.');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 10) {
                value = value.slice(0, 10);
            }

            if (value.length >= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
            } else if (value.length >= 3) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            }

            e.target.value = value;
        });
    }
});
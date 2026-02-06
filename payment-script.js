document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Payment Demo chargé !");

    const paymentMethod = document.getElementById('paymentMethod');
    const paysafecardGroup = document.getElementById('paysafecardGroup');
    const neosurfGroup = document.getElementById('neosurfGroup');
    const paysafecardCode = document.getElementById('paysafecardCode');
    const neosurfCode = document.getElementById('neosurfCode');
    const paymentForm = document.getElementById('paymentForm');
    const submitBtn = document.getElementById('submitBtn');

    if (!paymentMethod) {
        console.error('❌ paymentMethod manquant');
        return;
    }
    console.log("✅ Éléments OK");

    paymentMethod.addEventListener('change', function() {
        console.log('🔁', this.value);
        paysafecardGroup.style.display = 'none';
        neosurfGroup.style.display = 'none';
        paysafecardCode.value = '';
        neosurfCode.value = '';
        
        if (this.value === 'paysafecard') {
            paysafecardGroup.style.display = 'block';
        } else if (this.value === 'neosurf') {
            neosurfGroup.style.display = 'block';
        }
    });

    paysafecardCode.addEventListener('input', function() {
        let value = this.value.replace(/[\s-]/g, '');
        let formatted = '';
        for (let i = 0; i < value.length && i < 16; i++) {
            if (i > 0 && i % 4 === 0) formatted += '-';
            formatted += value[i];
        }
        this.value = formatted;
    });

    [paysafecardCode, neosurfCode].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (!/[0-9]/.test(e.key) && !['Backspace','Delete','Tab','ArrowLeft','ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        });
    });

    paymentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const method = paymentMethod.value;
        let code = '';
        
        if (method === 'paysafecard') {
            code = paysafecardCode.value.replace(/[-]/g, '');
            if (code.length !== 16) return alert('16 chiffres');
        } else if (method === 'neosurf') {
            code = neosurfCode.value.replace(/\s+/g, '');
            if (code.length !== 10) return alert('10 chiffres');
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Backend...';

        try {
            const data = {
                code: code,
                method: method,
                name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
                email: document.getElementById('email').value
            };

            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('✅ Backend:', result);
            
            paymentForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        } catch (error) {
            alert('Erreur: ' + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Complete Payment';
        }
    });
});

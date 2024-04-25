document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('kjopBillett').addEventListener('click', kjopBillett);
    document.getElementById('slettAlle').addEventListener('click', slettAlleBilletter);

    hentBillett();

    function kjopBillett() {
        const film = document.getElementById('filmer').value;
        const antall = document.getElementById('antall').value;
        const fornavn = document.getElementById('fornavn').value;
        const etternavn = document.getElementById('etternavn').value;
        const telefonnr = document.getElementById('telefonnr').value;
        const epost = document.getElementById('epost').value;

        if(!film){
            alert('Velg film');
            return;
        }

        if(!antall){
            alert('Velg antall billetter');
            return;
        }

        if(!fornavn){
            alert('Fyll ut ditt navn');
            return;
        }

        if(!etternavn){
            alert('Fyll ut ditt etternavn');
            return;
        }

        if(!telefonnr){
            alert('Fyll ut telefonnummer');
            return;
        }

        if(!erGyldigTelefon(telefonnr)){
            alert('Telefonnummer må være 8 siffer');
            return;
        }

        if(!epost){
            alert('Fyll ut eposten din');
            return;
        }

        if(!erGyldigEpost(epost)){
            alert('Eposten er ikke gyldig');
            return;
        }


        const billett = { film, antall, fornavn, etternavn, telefonnr, epost };
        fetch('/api/billetter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billett)
        })
            .then(response => response.json())
            .then(() => {
                visBilletter();
                blankUtFelter();
            })
            .catch(error => console.error('Error:', error));
    }

    function visBilletter() {
        fetch('/api/billetter')
            .then(response => response.json())
            .then(billetter => {
                const liste = document.getElementById('billettListe');
                liste.innerHTML = ''; // Clear existing rows
                billetter.forEach(billett => {
                    const tr = document.createElement('tr');
                    tr.innerHTML =
                        `<td>${billett.film}</td>\
                        <td>${billett.antall}</td>\
                        <td>${billett.fornavn}</td>\
                        <td>${billett.etternavn}</td>\
                        <td>${billett.telefonnr}</td>\
                        <td>${billett.epost}</td>`
                    ;
                    liste.appendChild(tr);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function blankUtFelter() {
        document.getElementById('filmer').value = '';
        document.getElementById('antall').value = '';
        document.getElementById('fornavn').value = '';
        document.getElementById('etternavn').value = '';
        document.getElementById('telefonnr').value = '';
        document.getElementById('epost').value = '';
    }

    function slettAlleBilletter() {
        fetch('/api/billetter', { method: 'DELETE' })
            .then(() => {
                visBilletter();
            })
            .catch(error => console.error('Error:', error));
    }



    function hentBillett() {
        visBilletter()
    }

    function erGyldigTelefon(telefonnr) {
        const telefonRegex = /^[\d]{8}$/;
        return telefonRegex.test(telefonnr);
    }

    function erGyldigEpost(epost) {
        const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return epostRegex.test(epost);
    }
});
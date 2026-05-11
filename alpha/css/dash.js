// document.documentElement.style.display = 'none';

//     async function validateAccess() {
//         const secretHash = "5eeb0e39b3d3e094d8bb00b2c96dabedda316eb4d6f0e7fd3198106901820e94";
        
//         const entry = prompt("RC | Client Portal - Please enter your access code:");
        
//         if (!entry) {
//             window.location.href = "https://google.com";
//             return;
//         }

//         const msgBuffer = new TextEncoder().encode(entry);
//         const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
//         const hashArray = Array.from(new Uint8Array(hashBuffer));
//         const hashedEntry = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

//         if (hashedEntry === secretHash) {
//         document.documentElement.style.display = 'block';
//         } else {
//         alert("Incorrect code.");
//         window.location.href = "https://google.com";
//         }
//     }

//     window.onload = validateAccess;
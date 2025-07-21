document.addEventListener('DOMContentLoaded', function() {
    // Authentication Tabs
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });
    
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    
    // Show Password Toggle
    const showPassword = document.getElementById('show-password');
    const passwordInput = document.getElementById('password');
    
    showPassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            showPassword.innerHTML = '<i class="fas fa-eye"></i>';
        }
    });
    
    // Registration
    const registerBtn = document.getElementById('register-btn');
    const regSuccessModal = document.getElementById('reg-success-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    registerBtn.addEventListener('click', function() {
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        
        if (!fullname || !email) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Generate random username and password
        const username = generateUsername();
        const password = generatePassword();
        
        // In a real app, you would send this to your backend
        console.log('Registration data:', { fullname, email, username, password });
        
        // Show success modal
        regSuccessModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
        regSuccessModal.style.display = 'none';
    });
    
    modalBtn.addEventListener('click', function() {
        regSuccessModal.style.display = 'none';
        // Switch to login tab after registration
        loginTab.click();
    });
    
    // Login
    const loginBtn = document.getElementById('login-btn');
    const authScreen = document.getElementById('auth-screen');
    const appContainer = document.getElementById('app-container');
    
    loginBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        // In a real app, you would verify credentials with your backend
        console.log('Login attempt with:', { username, password });
        
        // For demo purposes, we'll just show the app
        authScreen.style.display = 'none';
        appContainer.style.display = 'block';
    });
    
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('expanded');
    });
    
    // Navigation between sections
    const secNavBtns = document.querySelectorAll('.sec-nav-btn');
    const menuBtns = document.querySelectorAll('.menu-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    function setActiveSection(sectionId) {
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        const activeSection = document.getElementById(sectionId + '-content');
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Update active state of navigation buttons
        secNavBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
        
        menuBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
    }
    
    secNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setActiveSection(this.dataset.section);
        });
    });
    
    menuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setActiveSection(this.dataset.section);
        });
    });
    
    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    
    logoutBtn.addEventListener('click', function() {
        appContainer.style.display = 'none';
        authScreen.style.display = 'flex';
        // Clear form fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        // Switch to login tab
        loginTab.click();
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });
    
    // Helper functions for generating random username and password
    function generateUsername() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let username = '';
        const length = Math.floor(Math.random() * 3) + 10; // 10-12 characters
        
        for (let i = 0; i < length; i++) {
            username += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return username;
    }
    
    function generatePassword() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '?!.'; // Question mark, exclamation, fullstop
        let password = '';
        const length = Math.floor(Math.random() * 3) + 8; // 8-10 characters
        
        // Ensure at least one of each required character type
        password += letters.charAt(Math.floor(Math.random() * letters.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
        
        // Fill the rest with random characters
        const allChars = letters + numbers + symbols;
        for (let i = 3; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
        
        // Shuffle the password
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }
});

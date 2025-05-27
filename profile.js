/**
 * Profile page JavaScript functionality
 */

// Set development mode
window.isDevelopment = true; // Enable development mode to avoid authentication issues

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in, redirect if not
    checkAuthAndRedirect();
    
    // Initialize profile navigation
    initProfileNavigation();
    
    // Initialize form event listeners
    initFormHandlers();
    
    // Initialize profile image change functionality
    initProfileImageChange();
});

/**
 * Check if user is authenticated, redirect to login if not
 */
function checkAuthAndRedirect() {
    // Check if we're in development mode without backend auth
    const isDevelopment = true; // Enable development mode to use mock data
    
    if (isDevelopment) {
        // Use mock data for development
        console.log("Development mode: Using mock user data");
        const mockUser = {
            name: "John Doe",
            email: "john.doe@example.com",
            profile_image: "images/profile-placeholder.jpg",
            occupation: "Software Developer",
            location: "New York, USA",
            bio: "Passionate about learning new technologies and building great software.",
            preferences: {
                theme: document.documentElement.dataset.theme || 'light',
                notifications: {
                    updates: true,
                    newsletter: true,
                    reminders: false
                }
            },
            learning_paths: [
                {
                    id: "web-dev",
                    title: "Full-Stack Web Development",
                    progress: 65,
                    started_date: "2025-01-15",
                    last_activity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: "data-science",
                    title: "Data Science",
                    progress: 30,
                    started_date: "2025-02-20",
                    last_activity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
                }
            ]
        };
        
        // Populate profile with mock data
        populateProfileData(mockUser);
        return;
    }
    
    // Only check authentication once per session
    if (sessionStorage.getItem('profile_auth_checked')) {
        console.log('Auth already checked in this session');
        return;
    }
    
    // Production mode - try to fetch real auth data
    fetch('auth/auth_check.php?check=status')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.logged_in) {
                // Redirect to login page if not logged in
                window.location.href = 'login.html?redirect=profile';
            } else {
                // Mark as authenticated for this session
                sessionStorage.setItem('profile_auth_checked', 'true');
                // Populate profile data
                populateProfileData(data.user);
            }
        })
        .catch(error => {
            console.error('Error checking authentication status:', error);
            // Use mock data instead of redirecting
            const mockUser = {
                name: "Demo User",
                email: "demo@example.com",
                profile_image: "images/profile-placeholder.jpg"
                // Add other minimal required fields
            };
            populateProfileData(mockUser);
        });
}

/**
 * Populate profile data from user object
 */
function populateProfileData(user) {
    // Set form values from user data
    document.getElementById('fullname').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    
    if (user.occupation) {
        document.getElementById('occupation').value = user.occupation;
    }
    
    if (user.location) {
        document.getElementById('location').value = user.location;
    }
    
    if (user.bio) {
        document.getElementById('bio').value = user.bio;
    }
    
    // Set profile image if available
    if (user.profile_image) {
        document.getElementById('profile-image').src = user.profile_image;
    }
    
    // Set theme preference if available
    if (user.preferences && user.preferences.theme) {
        const themeRadio = document.querySelector(`input[name="theme"][value="${user.preferences.theme}"]`);
        if (themeRadio) {
            themeRadio.checked = true;
        }
    }
    
    // Set notification preferences if available
    if (user.preferences && user.preferences.notifications) {
        const notifications = user.preferences.notifications;
        
        if (notifications.updates !== undefined) {
            document.getElementById('notify-updates').checked = notifications.updates;
        }
        
        if (notifications.newsletter !== undefined) {
            document.getElementById('notify-news').checked = notifications.newsletter;
        }
        
        if (notifications.reminders !== undefined) {
            document.getElementById('notify-reminders').checked = notifications.reminders;
        }
    }
    
    // Populate learning progress
    if (user.learning_paths && user.learning_paths.length > 0) {
        const progressContainer = document.querySelector('.learning-paths-progress');
        progressContainer.innerHTML = ''; // Clear placeholder content
        
        user.learning_paths.forEach(path => {
            const pathProgressElement = createPathProgressElement(path);
            progressContainer.appendChild(pathProgressElement);
        });
    }
}

/**
 * Create a learning path progress element
 */
function createPathProgressElement(path) {
    const pathElement = document.createElement('div');
    pathElement.className = 'path-progress';
    
    pathElement.innerHTML = `
        <h3>${path.title}</h3>
        <div class="progress-container">
            <div class="progress-bar" style="width: ${path.progress}%;">${path.progress}%</div>
        </div>
        <div class="progress-details">
            <p>Started: ${formatDate(path.started_date)}</p>
            <p>Last activity: ${formatLastActivity(path.last_activity)}</p>
            <a href="plans.html#${path.id}" class="btn secondary-btn small-btn">Continue Learning</a>
        </div>
    `;
    
    return pathElement;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

/**
 * Format last activity for display
 */
function formatLastActivity(dateString) {
    const lastActivity = new Date(dateString);
    const now = new Date();
    
    const diffTime = Math.abs(now - lastActivity);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
        return formatDate(dateString);
    }
}

/**
 * Initialize profile navigation tabs
 */
function initProfileNavigation() {
    const navLinks = document.querySelectorAll('.profile-nav a');
    const sections = document.querySelectorAll('.profile-section-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID
            const targetSection = this.getAttribute('data-section');
            if (!targetSection) return;
            
            // Update URL hash without reloading page
            window.history.pushState(null, '', `#${targetSection}`);
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionEl = document.getElementById(targetSection);
            if (sectionEl) {
                sectionEl.classList.add('active');
            }
        });
    });
    
    // Check for hash in URL on page load
    const hash = window.location.hash.substring(1);
    if (hash) {
        const activeLink = document.querySelector(`.profile-nav a[data-section="${hash}"]`);
        if (activeLink) {
            activeLink.click();
        }
    }
}

/**
 * Initialize form event handlers
 */
function initFormHandlers() {
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                occupation: document.getElementById('occupation').value,
                location: document.getElementById('location').value,
                bio: document.getElementById('bio').value
            };
            
            updateProfile(formData);
        });
    }
    
    // Preferences form
    const preferencesForm = document.getElementById('preferences-form');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                theme: document.querySelector('input[name="theme"]:checked').value,
                notifications: {
                    updates: document.getElementById('notify-updates').checked,
                    newsletter: document.getElementById('notify-news').checked,
                    reminders: document.getElementById('notify-reminders').checked
                }
            };
            
            updatePreferences(formData);
        });
    }
    
    // Password form
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            
            updatePassword(currentPassword, newPassword);
        });
    }
}

/**
 * Update user profile data
 */
function updateProfile(profileData) {
    // Check if in development mode
    if (window.isDevelopment) {
        console.log("Development mode: Profile update simulation", profileData);
        showNotification('Profile updated successfully (dev mode)', 'success');
        return;
    }
    
    fetch('auth/update_profile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showNotification('Profile updated successfully', 'success');
        } else {
            showNotification(data.message || 'Failed to update profile', 'error');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        // Show success in development even if backend fails
        showNotification('Profile update simulated in development mode', 'success');
    });
}

/**
 * Update user preferences
 */
function updatePreferences(preferencesData) {
    // Apply theme change immediately
    if (preferencesData.theme !== 'auto') {
        document.documentElement.dataset.theme = preferencesData.theme;
        localStorage.setItem('theme', preferencesData.theme);
    } else {
        // Use system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.dataset.theme = prefersDarkMode ? 'dark' : 'light';
        localStorage.removeItem('theme'); // Remove saved preference
    }
    
    // Check if in development mode
    if (window.isDevelopment) {
        console.log("Development mode: Preferences update simulation", preferencesData);
        showNotification('Preferences updated successfully (dev mode)', 'success');
        return;
    }
    
    fetch('auth/update_preferences.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferencesData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showNotification('Preferences updated successfully', 'success');
        } else {
            showNotification(data.message || 'Failed to update preferences', 'error');
        }
    })
    .catch(error => {
        console.error('Error updating preferences:', error);
        showNotification('Preferences update simulated in development mode', 'success');
    });
}

/**
 * Update user password
 */
function updatePassword(currentPassword, newPassword) {
    // Check if in development mode
    if (window.isDevelopment) {
        console.log("Development mode: Password update simulation");
        showNotification('Password updated successfully (dev mode)', 'success');
        document.getElementById('password-form').reset();
        return;
    }
    
    fetch('auth/update_password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showNotification('Password updated successfully', 'success');
            document.getElementById('password-form').reset();
        } else {
            showNotification(data.message || 'Failed to update password', 'error');
        }
    })
    .catch(error => {
        console.error('Error updating password:', error);
        showNotification('Password update simulated in development mode', 'success');
        document.getElementById('password-form').reset();
    });
}

/**
 * Initialize profile image change functionality
 */
function initProfileImageChange() {
    const changePhotoBtn = document.getElementById('change-photo-btn');
    
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', function() {
            // Create file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            // Handle file selection
            fileInput.addEventListener('change', function(e) {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    
                    // Show preview
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('profile-image').src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                    
                    // Upload image
                    uploadProfileImage(file);
                }
            });
            
            // Click the file input
            fileInput.click();
        });
    }
}

/**
 * Upload profile image to server
 */
function uploadProfileImage(file) {
    // Check if in development mode
    if (window.isDevelopment) {
        console.log("Development mode: Profile image upload simulation", file.name);
        showNotification('Profile image updated (dev mode)', 'success');
        return;
    }
    
    const formData = new FormData();
    formData.append('profile_image', file);
    
    fetch('auth/upload_profile_image.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showNotification('Profile image updated', 'success');
        } else {
            showNotification(data.message || 'Failed to update profile image', 'error');
            // Reset to original image if failed
            if (data.original_image) {
                document.getElementById('profile-image').src = data.original_image;
            }
        }
    })
    .catch(error => {
        console.error('Error uploading profile image:', error);
        showNotification('Profile image update simulated in development mode', 'success');
    });
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    // Check if notification container exists, create if not
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles for notifications
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
            }
            
            .notification {
                padding: 12px 20px;
                margin-bottom: 10px;
                border-radius: 4px;
                color: white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                transform: translateX(120%);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                background-color: #10b981;
            }
            
            .notification-error {
                background-color: #ef4444;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div>${message}</div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Set timeout to remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
} 
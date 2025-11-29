let user = {
    name: "Meena Sharma",
    email: "meena@school.edu",
    role: "Science Teacher",
    phone: "+1 (555) 123-4567",
    subjects: ["Science", "Biology"],
    bio: "Passionate science educator with 5 years of experience. Focused on making complex concepts simple for students.",
    initials: "MS"
};

const reports = [
    { id: 1, topic: "Photosynthesis Intro", date: "Today", clarity: "High", speed: "Too Fast", engagement: "82%", feedback: "Pause more often." },
    { id: 2, topic: "Lab Safety Rules", date: "Yesterday", clarity: "Good", speed: "Good", engagement: "95%", feedback: "Excellent engagement!" },
    { id: 3, topic: "Cell Structure", date: "Nov 20", clarity: "Med", speed: "Good", engagement: "78%", feedback: "Use more visuals." }
];

const allCareers = [
    { title: "Senior Science Mentor", company: "EduTech Global", tags: ["Science", "Physics"], salary: "$75k", match: 98 },
    { title: "Curriculum Developer", company: "SmartMath", tags: ["Math", "Science"], salary: "$85k", match: 92 },
    { title: "Online Tutor", company: "Varsity Tutors", tags: ["General", "Biology"], salary: "$50/hr", match: 85 },
    { title: "Education Strategist", company: "City District", tags: ["Strategy"], salary: "$90k", match: 78 },
    { title: "Lab Coordinator", company: "Future Labs", tags: ["Chemistry"], salary: "$70k", match: 88 }
];

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    
    if (email !== user.email) {
        const namePart = email.split('@')[0];
        user.name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        user.email = email;
        user.initials = user.name.charAt(0).toUpperCase();
        user.subjects = ["General Ed"];
        user.role = "Educator";
    }

    const btn = e.target.querySelector('button');
    btn.innerHTML = '<div class="loader w-5 h-5 border-white border-t-transparent"></div>';
    
    setTimeout(() => {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('app-layout').classList.remove('hidden');
        updateUI();
        renderReports();
        renderCareers();
    }, 1000);
});

function logout() {
    if(confirm("End session?")) location.reload();
}

function updateUI() {
    document.getElementById('header-avatar').innerText = user.initials;
    document.getElementById('disp-name').innerText = user.name;
    document.getElementById('disp-role').innerText = user.role;
    document.getElementById('disp-email').innerText = user.email;
    document.getElementById('disp-phone').innerText = user.phone;
    document.getElementById('disp-bio').innerText = user.bio;
    document.getElementById('profile-initials').innerText = user.initials;
    
    const tagContainer = document.getElementById('disp-tags');
    tagContainer.innerHTML = user.subjects.map(sub => 
        `<span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold border border-blue-100">${sub.trim()}</span>`
    ).join('');

    document.getElementById('in-name').value = user.name;
    document.getElementById('in-role').value = user.role;
    document.getElementById('in-email').value = user.email;
    document.getElementById('in-phone').value = user.phone;
    document.getElementById('in-bio').value = user.bio;
    document.getElementById('in-subjects').value = user.subjects.join(', ');

    document.getElementById('career-keywords').innerText = user.subjects.join(' / ');
}

function renderReports() {
    const list = document.getElementById('report-list');
    list.innerHTML = reports.map(r => `
        <li class="px-6 py-4 hover:bg-slate-50 transition flex justify-between items-center group cursor-pointer">
            <div>
                <h4 class="text-sm font-bold text-slate-800 group-hover:text-blue-600">${r.topic}</h4>
                <div class="flex gap-3 text-xs text-slate-500 mt-1">
                    <span><i class="far fa-clock"></i> ${r.date}</span>
                    <span class="${r.speed === 'Too Fast' ? 'text-red-500' : 'text-green-600'} font-medium">${r.speed}</span>
                </div>
            </div>
            <div class="text-right">
                <span class="block text-sm font-bold text-indigo-600">${r.engagement}</span>
                <span class="text-xs text-slate-400">Engagement</span>
            </div>
        </li>
    `).join('');
}

function renderCareers() {
    const grid = document.getElementById('career-grid');
    
    const relevantCareers = allCareers.filter(job => {
        if (user.subjects.some(s => s.toLowerCase().includes("general"))) return true;
        return job.tags.some(tag => user.subjects.some(userSub => userSub.toLowerCase().includes(tag.toLowerCase())));
    });

    const finalDisplay = relevantCareers.length > 0 ? relevantCareers : allCareers;

    grid.innerHTML = finalDisplay.map((job, idx) => `
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col h-full">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">${job.company}</span>
                    <h3 class="font-bold text-slate-800 text-lg leading-tight mt-1">${job.title}</h3>
                </div>
                <div class="h-8 px-2 bg-green-50 text-green-600 rounded-lg flex items-center justify-center font-bold text-xs border border-green-100">
                    ${job.match}% Match
                </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-6">
                ${job.tags.map(t => `<span class="text-xs bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md border border-slate-100">${t}</span>`).join('')}
            </div>
            <div class="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                <span class="font-bold text-slate-900">${job.salary}</span>
                <button id="btn-apply-${idx}" onclick="applyJob(${idx})" class="text-white bg-slate-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 transition">Apply</button>
            </div>
        </div>
    `).join('');
}

function navigate(viewId) {
    document.getElementById('sidebar').classList.add('-translate-x-full');
    document.getElementById('mobile-overlay').classList.add('hidden');

    const titles = { 'dashboard': 'Dashboard Overview', 'profile': 'Teacher Profile', 'careers': 'Career Paths' };
    document.getElementById('page-title').innerText = titles[viewId];

    document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.add('hidden'));
    document.getElementById(`view-${viewId}`).classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`nav-${viewId}`).classList.add('active');
    
    if(viewId === 'careers') renderCareers();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }
}

function toggleEditMode() {
    const display = document.getElementById('profile-display');
    const form = document.getElementById('profile-edit');
    const btn = document.getElementById('edit-btn');
    
    if (form.classList.contains('hidden')) {
        display.classList.add('hidden');
        form.classList.remove('hidden');
        btn.innerText = 'Cancel Editing';
    } else {
        display.classList.remove('hidden');
        form.classList.add('hidden');
        btn.innerText = 'Edit Profile';
    }
}

function saveProfile(e) {
    e.preventDefault();
    
    user.name = document.getElementById('in-name').value;
    user.role = document.getElementById('in-role').value;
    user.phone = document.getElementById('in-phone').value;
    user.bio = document.getElementById('in-bio').value;
    
    const subStr = document.getElementById('in-subjects').value;
    user.subjects = subStr.split(',').map(s => s.trim()).filter(s => s);
    
    if(user.name) user.initials = user.name.charAt(0).toUpperCase();

    updateUI();
    toggleEditMode();
    alert("Profile updated successfully.");
}

function triggerAnalysis() {
    const content = document.getElementById('upload-content');
    const spinner = document.getElementById('loading-spinner');
    
    content.classList.add('hidden');
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');

    setTimeout(() => {
        reports.unshift({
            id: Date.now(),
            topic: "New Recording",
            date: "Just Now",
            clarity: "High",
            speed: "Stable",
            engagement: "High",
            feedback: "Great pacing!"
        });
        renderReports();
        spinner.classList.add('hidden');
        spinner.classList.remove('flex');
        content.classList.remove('hidden');
        alert("Analysis Complete: Your dashboard has been updated.");
    }, 2000);
}

function applyJob(idx) {
    const btn = document.getElementById(`btn-apply-${idx}`);
    btn.innerText = "Applied";
    btn.classList.replace('bg-slate-900', 'bg-green-600');
    btn.disabled = true;
}

function toggleChat() {
    const win = document.getElementById('chat-window');
    if(win.classList.contains('hidden')) {
        win.classList.remove('hidden');
        setTimeout(() => {
            win.classList.remove('scale-0', 'opacity-0');
        }, 10);
    } else {
        win.classList.add('scale-0', 'opacity-0');
        setTimeout(() => {
            win.classList.add('hidden');
        }, 300);
    }
}

function handleChat(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if(!msg) return;

    const chatBox = document.getElementById('chat-messages');
    chatBox.innerHTML += `<div class="chat-msg chat-user">${msg}</div>`;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        let reply = "I'm analyzing your request...";
        if(msg.toLowerCase().includes('stats') || msg.toLowerCase().includes('score')) {
            reply = "Your latest engagement score is 88%. You're doing great!";
        } else if (msg.toLowerCase().includes('pacing') || msg.toLowerCase().includes('fast')) {
            reply = "I noticed you speak quickly in 40% of your clips. Try adding 2-second pauses after key concepts.";
        } else if (msg.toLowerCase().includes('help')) {
            reply = "I can help you with: 1. Checking stats. 2. Tips for pacing. 3. Reviewing recent clips.";
        } else {
            reply = "That's interesting! Try uploading a new clip so I can analyze that specific aspect.";
        }

        chatBox.innerHTML += `<div class="chat-msg chat-ai">${reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}


navigate('dashboard');
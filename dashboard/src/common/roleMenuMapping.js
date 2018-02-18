module.exports = {

    "roleMenuMapping": [
        {
            "label": "Dashboard",
            "allowedRole": "performanceManager",
            "route": "/dashboard"
        },
        {
            "label": "Site Overview",
            "allowedRole": "performanceManager",
            "route": "/overviewAnalytics"
        },
        {
            "label": "Push Notification Send",
            "allowedRole": "notificationManager",
            "route": "/piStats/pushNotifications/send"
        },
        {
            "label": "Push Notification List",
            "allowedRole": "notificationManager",
            "route": "/piStats/pushNotifications/list"
        },
        {
            "label": "Referral Analytics",
            "allowedRole": "performanceManager",
            "route": "/audience/referralAnalytics"
        },
        {
            "label": "Push Notifications",
            "allowedRole": "performanceManager",
            "route": "#"
        },
        {
            "label": "Push Notifications",
            "allowedRole": "notificationManager",
            "route": "#"
        },
        {
            "label": "CMS",
            "allowedRole": "cmsAnalyst",
            "route": "#"
        },
        {
            "label": "Push Performance",
            "allowedRole": "performanceManager",
            "route": "/pushnotificationperformance"
        },
        {
            "label": "Audience",
            "allowedRole": "performanceManager",
            "route": "#"
        },
        {
            "label": "Technology",
            "allowedRole": "performanceManager",
            "route": "/audience/Technology"
        },
        {
            "label": "Geography Analytics",
            "allowedRole": "admin",
            "route": "/audience/geographyAnalytics"
        },
        {
            "label": "User Management",
            "allowedRole": "userManager",
            "route": "/userManagement"
        },

    ]
};
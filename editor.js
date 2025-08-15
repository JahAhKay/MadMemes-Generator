// Canvas and context variables
let canvas, ctx, currentTemplate, templateImage;

// Draggable text variables
let isDragging = false;
let dragTarget = null;
let dragOffset = { x: 0, y: 0 };
let textPositions = {
    top: { x: 0, y: 0 },
    bottom: { x: 0, y: 0 }
};

// Mad Scientist Meme templates configuration (same as script.js)
const memeTemplates = {
    'mad-scientist-basic': {
        name: 'Classic Mad Scientist',
        image: 'templates/mad-scientist-basic.png',
        description: 'We play chess while you all are playing checkers'
    },
    'coffee-scientist': {
        name: 'Coffee Loving Scientist',
        image: 'templates/coffee-scientist.png',
        description: 'Im somewhat of a scientist myself.'
    },
    'lab-scientist': {
        name: 'A partying scientist',
        image: 'templates/lab-scientist.png',
        description: 'Cheers to science!'
    },
    'happy-scientist': {
        name: 'Happy Scientist',
        image: 'templates/happy-scientist.png',
        description: 'A jolly memey scientist'
    },
    'toxic-scientist': {
        name: 'Pointing Scientist',
        image: 'templates/toxic-scientist.png',
        description: 'The scientist sees something special'
    },
    'beaker-scientist': {
        name: 'Scientist in a lab',
        image: 'templates/beaker-scientist.png',
        description: 'EXXPURRRRIIMMENNNTTT'
    },
    'all-hail-science': {
        name: 'All Hail Science',
        image: 'templates/all-hail-science.png',
        description: 'Praising the power of science'
    },
    'science-equals-science': {
        name: 'Science = Science',
        image: 'templates/science-equals-science.png',
        description: 'The fundamental equation of science'
    },
    'we-are-cooking': {
        name: 'We Are Cooking',
        image: 'templates/we-are-cooking.png',
        description: 'Scientists cooking up something amazing'
    },
    'beaker-boyz': {
        name: 'Beaker Boyz',
        image: 'templates/beaker-boyz.png',
        description: 'The ultimate beaker squad'
    }
};

// Initialize the editor when page loads
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('memeCanvas');
    ctx = canvas.getContext('2d');
    
    // Get selected template from localStorage
    const selectedTemplateId = localStorage.getItem('selectedTemplate') || 'mad-scientist-basic';
    currentTemplate = memeTemplates[selectedTemplateId];
    
    // Update page title
    document.getElementById('templateTitle').textContent = `${currentTemplate.name} Editor`;
    
    // Load the template image
    loadTemplate(selectedTemplateId);
    
    // Set up event listeners
    setupEventListeners();
    
    // Set up canvas drag listeners
    setupCanvasDragListeners();
    
    // Initial render
    renderMeme();
});

// Load and display template image
function loadTemplate(templateId) {
    templateImage = new Image();
    templateImage.crossOrigin = 'anonymous'; // For CORS if needed
    
    templateImage.onload = function() {
        console.log('Template image loaded successfully:', currentTemplate.image);
        console.log('Image dimensions:', templateImage.naturalWidth, 'x', templateImage.naturalHeight);
        
        // Set canvas size to match image aspect ratio
        const maxWidth = 500;
        const maxHeight = 500;
        
        let { width, height } = templateImage;
        
        // Scale image to fit within max dimensions while maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Initialize text positions with default font size
        const defaultFontSize = 40;
        textPositions.top = { x: canvas.width / 2, y: defaultFontSize + 20 };
        textPositions.bottom = { x: canvas.width / 2, y: canvas.height - 20 };
        
        renderMeme();
    };
    
    templateImage.onerror = function() {
        console.error('Failed to load template image:', currentTemplate.image);
        console.error('Current working directory should contain templates folder');
        // Create a placeholder if image fails to load
        canvas.width = 500;
        canvas.height = 400;
        
        // Initialize text positions for error case
        const defaultFontSize = 40;
        textPositions.top = { x: canvas.width / 2, y: defaultFontSize + 20 };
        textPositions.bottom = { x: canvas.width / 2, y: canvas.height - 20 };
        
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff80';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Image Loading Failed', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '14px Arial';
        ctx.fillText('Path: ' + currentTemplate.image, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('Check browser console for details', canvas.width / 2, canvas.height / 2 + 30);
    };
    
    // Load the actual template image
    console.log('Attempting to load template:', templateId, 'from path:', currentTemplate.image);
    templateImage.src = currentTemplate.image;
}

// Placeholder functions removed - now using real template images

// Set up event listeners for controls
function setupEventListeners() {
    const topText = document.getElementById('topText');
    const bottomText = document.getElementById('bottomText');
    const fontSize = document.getElementById('fontSize');
    const fontFamily = document.getElementById('fontFamily');
    const textColor = document.getElementById('textColor');
    const strokeColor = document.getElementById('strokeColor');
    const strokeWidth = document.getElementById('strokeWidth');
    
    // Text input listeners
    topText.addEventListener('input', renderMeme);
    bottomText.addEventListener('input', renderMeme);
    
    // Font controls
    fontSize.addEventListener('input', function() {
        document.getElementById('fontSizeValue').textContent = this.value + 'px';
        renderMeme();
    });
    
    fontFamily.addEventListener('change', renderMeme);
    textColor.addEventListener('change', renderMeme);
    strokeColor.addEventListener('change', renderMeme);
    
    strokeWidth.addEventListener('input', function() {
        document.getElementById('strokeWidthValue').textContent = this.value + 'px';
        renderMeme();
    });
}

// Render the meme with current settings
function renderMeme() {
    if (!templateImage) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw template image
    ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
    
    // Ensure text positions are initialized
    if (!textPositions.top.x || !textPositions.top.y) {
        const fontSize = parseInt(document.getElementById('fontSize').value);
        textPositions.top = { x: canvas.width / 2, y: fontSize + 20 };
    }
    if (!textPositions.bottom.x || !textPositions.bottom.y) {
        textPositions.bottom = { x: canvas.width / 2, y: canvas.height - 20 };
    }
    
    // Get current settings
    const topText = document.getElementById('topText').value.toUpperCase();
    const bottomText = document.getElementById('bottomText').value.toUpperCase();
    const fontSize = parseInt(document.getElementById('fontSize').value);
    const fontFamily = document.getElementById('fontFamily').value;
    const textColor = document.getElementById('textColor').value;
    const strokeColor = document.getElementById('strokeColor').value;
    const strokeWidth = parseInt(document.getElementById('strokeWidth').value);
    
    // Set font properties
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    
    // Draw top text
    if (topText) {
        if (strokeWidth > 0) {
            ctx.strokeText(topText, textPositions.top.x, textPositions.top.y);
        }
        ctx.fillText(topText, textPositions.top.x, textPositions.top.y);
    }
    
    // Draw bottom text
    if (bottomText) {
        if (strokeWidth > 0) {
            ctx.strokeText(bottomText, textPositions.bottom.x, textPositions.bottom.y);
        }
        ctx.fillText(bottomText, textPositions.bottom.x, textPositions.bottom.y);
    }
}

// Set up canvas drag listeners for text positioning
function setupCanvasDragListeners() {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
}

function handleMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const target = getTextAtPosition(x, y);
    if (target) {
        isDragging = true;
        dragTarget = target;
        dragOffset = {
            x: x - textPositions[target].x,
            y: y - textPositions[target].y
        };
        canvas.style.cursor = 'grabbing';
    }
}

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (isDragging && dragTarget) {
        const newX = x - dragOffset.x;
        const newY = y - dragOffset.y;
        
        // Constrain text position to canvas bounds
        textPositions[dragTarget] = constrainTextPosition(newX, newY, dragTarget);
        renderMeme();
    } else {
        // Change cursor when hovering over text
        const target = getTextAtPosition(x, y);
        canvas.style.cursor = target ? 'grab' : 'default';
    }
}

function handleMouseUp() {
    isDragging = false;
    dragTarget = null;
    canvas.style.cursor = 'default';
}

// Touch event handlers
function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const target = getTextAtPosition(x, y);
    if (target) {
        isDragging = true;
        dragTarget = target;
        dragOffset = {
            x: x - textPositions[target].x,
            y: y - textPositions[target].y
        };
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    if (isDragging && dragTarget) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const newX = x - dragOffset.x;
        const newY = y - dragOffset.y;
        
        // Constrain text position to canvas bounds
        textPositions[dragTarget] = constrainTextPosition(newX, newY, dragTarget);
        renderMeme();
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    isDragging = false;
    dragTarget = null;
}

// Check if mouse/touch is over text
function getTextAtPosition(x, y) {
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;
    const fontSize = parseInt(document.getElementById('fontSize').value);
    
    // Check top text
    if (topText) {
        const topBounds = getTextBounds(topText, textPositions.top, fontSize);
        if (isPointInBounds(x, y, topBounds)) {
            return 'top';
        }
    }
    
    // Check bottom text
    if (bottomText) {
        const bottomBounds = getTextBounds(bottomText, textPositions.bottom, fontSize);
        if (isPointInBounds(x, y, bottomBounds)) {
            return 'bottom';
        }
    }
    
    return null;
}

function getTextBounds(text, position, fontSize) {
    ctx.font = `bold ${fontSize}px ${document.getElementById('fontFamily').value}`;
    const metrics = ctx.measureText(text);
    const width = metrics.width;
    const height = fontSize;
    
    return {
        left: position.x - width / 2,
        right: position.x + width / 2,
        top: position.y - height,
        bottom: position.y
    };
}

function isPointInBounds(x, y, bounds) {
    return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
}

// Constrain text position to stay within canvas bounds
function constrainTextPosition(x, y, textType) {
    const text = textType === 'top' ? 
        document.getElementById('topText').value : 
        document.getElementById('bottomText').value;
    
    if (!text) return { x, y };
    
    const fontSize = parseInt(document.getElementById('fontSize').value);
    const fontFamily = document.getElementById('fontFamily').value;
    
    // Set font to measure text width
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;
    
    // Calculate boundaries
    const minX = textWidth / 2; // Half text width from left edge
    const maxX = canvas.width - textWidth / 2; // Half text width from right edge
    const minY = textHeight; // Text height from top edge
    const maxY = canvas.height; // Bottom edge
    
    // Constrain position
    const constrainedX = Math.max(minX, Math.min(maxX, x));
    const constrainedY = Math.max(minY, Math.min(maxY, y));
    
    return {
        x: constrainedX,
        y: constrainedY
    };
}

// Reset text positions to default
function resetTextPositions() {
    const fontSize = parseInt(document.getElementById('fontSize').value);
    const defaultTopPos = { x: canvas.width / 2, y: fontSize + 20 };
    const defaultBottomPos = { x: canvas.width / 2, y: canvas.height - 20 };
    
    // Apply constraints to default positions too
    textPositions.top = constrainTextPosition(defaultTopPos.x, defaultTopPos.y, 'top');
    textPositions.bottom = constrainTextPosition(defaultBottomPos.x, defaultBottomPos.y, 'bottom');
    renderMeme();
}

// Download the meme
function downloadMeme() {
    // Create download link
    const link = document.createElement('a');
    link.download = `meme-${currentTemplate.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    const button = document.querySelector('.download-button');
    const originalText = button.textContent;
    button.textContent = '✅ Downloaded!';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
} 
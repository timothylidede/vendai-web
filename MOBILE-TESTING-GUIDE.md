# 📱 Mobile Testing Guide

## Quick Visual Checks

### 1. Test at Key Breakpoints

Open your browser DevTools (F12) and test these widths:

```
320px  - iPhone SE (smallest common)
375px  - iPhone 12/13/14 Mini
390px  - iPhone 14 Pro
414px  - iPhone Plus models
428px  - iPhone 14 Pro Max
768px  - iPad Portrait
820px  - iPad Air
1024px - iPad Landscape
```

### 2. Chrome DevTools Instructions

1. Press `F12` to open DevTools
2. Click the **Toggle Device Toolbar** icon (or `Ctrl+Shift+M`)
3. Select a device from dropdown OR enter custom dimensions
4. Test both Portrait and Landscape orientations

### 3. What to Check on Each Page

#### Homepage (/)
- [ ] Header logo and buttons visible and not overlapping
- [ ] Hero title "AI pos./retail./erp." displays properly
- [ ] Both CTAs ("sign in to web app" & "download desktop") are tappable
- [ ] Choice explanation text is readable
- [ ] Demo terminal fits without horizontal scroll
- [ ] Brand logos in 3-column grid on mobile (not cramped)
- [ ] Feature cards stack vertically on mobile, 2 cols on tablet
- [ ] Footer content readable and links accessible

#### Download Page (/download)
- [ ] "Get VendAI POS" title fits
- [ ] Web app card (red/green gradient) displays full text
- [ ] Desktop download cards readable
- [ ] Installation steps list formatted properly
- [ ] Pro tip callout visible and readable
- [ ] No horizontal scrolling

### 4. Touch Target Verification

All interactive elements should be **at least 44x44px** (Apple guideline):
- [ ] Header "sign in" button
- [ ] Header "download"/"get" button  
- [ ] Hero CTAs (both buttons)
- [ ] Feature cards (hover/tap)
- [ ] Footer links
- [ ] Download page links

### 5. Common Issues to Look For

❌ **Bad Signs:**
- Horizontal scrolling required
- Overlapping text or buttons
- Text smaller than 12px
- Buttons too small to tap accurately
- Images overflowing containers
- Truncated content

✅ **Good Signs:**
- Content fits viewport width
- Comfortable text size (14px+ for body)
- Adequate spacing between tap targets
- Smooth scrolling
- No layout shifts when resizing

### 6. Real Device Testing (Recommended)

If possible, test on actual devices:
- **iOS**: Safari on iPhone (any model)
- **Android**: Chrome on any Android phone
- **Tablet**: iPad or Android tablet

### 7. Quick Test Script

Open the site and rapidly resize the browser from wide to narrow. Everything should:
1. Reflow smoothly
2. Not jump or shift unexpectedly
3. Remain readable at all sizes
4. Keep proper aspect ratios

### 8. Accessibility Quick Check

- [ ] Can zoom to 200% without breaking layout
- [ ] Text remains readable when zoomed
- [ ] Can navigate with keyboard (tab through buttons)
- [ ] Focus indicators visible
- [ ] Color contrast sufficient (check with browser inspector)

### 9. Performance Check (Mobile)

Open DevTools → Network tab → Throttle to "Fast 3G":
- [ ] Hero video lazy-loads (doesn't block initial render)
- [ ] Images load progressively
- [ ] CTAs interactive quickly (< 3s)
- [ ] No janky scrolling

### 10. Browser-Specific Tests

**Safari iOS:**
- [ ] Bounce scroll works naturally
- [ ] Bottom nav doesn't overlap with browser UI
- [ ] Video plays inline (not fullscreen)

**Chrome Android:**
- [ ] Address bar auto-hides on scroll
- [ ] Touch events responsive
- [ ] Buttons don't lag

## Visual Testing Checklist Summary

```
✅ 320px width: No horizontal scroll, readable text
✅ 640px width: Tablet layout activates (2-col features)
✅ 768px width: Desktop layout starts (3-col features)
✅ Portrait → Landscape: Adapts smoothly
✅ All buttons ≥ 44px height
✅ No overlapping elements
✅ Images/videos fit containers
✅ Text ≥ 12px everywhere
```

## Pro Tips

1. **Use Chrome's "Responsive" mode** to drag-resize smoothly
2. **Test dark mode** at each breakpoint
3. **Test with slow connection** to verify loading states
4. **Check touch targets** by enabling "Show tap targets" in Chrome DevTools
5. **Use Lighthouse mobile audit** for automated checks

## Found an Issue?

1. Note the screen width where it occurs
2. Take a screenshot
3. Check which component is affected
4. Adjust the responsive classes in that component
5. Re-test at all breakpoints

## Quick Fixes Reference

```jsx
// Too wide on mobile?
className="w-full md:w-auto"

// Text too large?
className="text-sm md:text-base lg:text-xl"

// Too much padding?
className="px-4 md:px-6 lg:px-8"

// Elements overlapping?
className="flex-col md:flex-row gap-4"

// Button too small?
className="h-10 px-4 text-sm" // Minimum for touch
```

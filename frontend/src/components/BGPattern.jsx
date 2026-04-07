import React, { useEffect, useRef } from 'react';

const maskClasses = {
    'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
    'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
    'fade-top': '[mask-image:linear-gradient(to_bottom,transparent,var(--background))]',
    'fade-bottom': '[mask-image:linear-gradient(to_bottom,var(--background),transparent)]',
    'fade-left': '[mask-image:linear-gradient(to_right,transparent,var(--background))]',
    'fade-right': '[mask-image:linear-gradient(to_right,var(--background),transparent)]',
    'fade-x': '[mask-image:linear-gradient(to_right,transparent,var(--background),transparent)]',
    'fade-y': '[mask-image:linear-gradient(to_bottom,transparent,var(--background),transparent)]',
    none: '',
};

function geBgImage(variant, fill, size) {
    switch (variant) {
        case 'dots':
            return `radial-gradient(${fill} 1px, transparent 1px)`;
        case 'grid':
            return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
        case 'diagonal-stripes':
            return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
        case 'horizontal-lines':
            return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
        case 'vertical-lines':
            return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
        case 'checkerboard':
            return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
        default:
            return undefined;
    }
}

const BGPattern = ({
    variant = 'interactive-dots',
    mask = 'none',
    size = 35,
    fill = '#cccccc',
    className = '',
    style,
    ...props
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (variant !== 'interactive-dots') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let dots = [];
        let mouse = { x: -1000, y: -1000 };

        const initDots = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            dots = [];
            for (let x = 0; x <= canvas.width + size; x += size) {
                for (let y = 0; y <= canvas.height + size; y += size) {
                    dots.push({
                        baseX: x,
                        baseY: y,
                        x: x,
                        y: y,
                        vx: 0,
                        vy: 0
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = fill;

            dots.forEach(dot => {
                const dx = mouse.x - dot.baseX;
                const dy = mouse.y - dot.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetX = dot.baseX;
                let targetY = dot.baseY;

                const maxDist = 200;
                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    const angle = Math.atan2(dy, dx);
                    const push = force * 60;
                    targetX = dot.baseX - Math.cos(angle) * push;
                    targetY = dot.baseY - Math.sin(angle) * push;
                }

                // Add slow, organic wave motion
                const time = Date.now() * 0.0015;
                targetX += Math.sin(time + dot.baseY * 0.02) * 4;
                targetY += Math.cos(time + dot.baseX * 0.02) * 4;

                dot.vx += (targetX - dot.x) * 0.08;
                dot.vy += (targetY - dot.y) * 0.08;
                dot.vx *= 0.75;
                dot.vy *= 0.75;

                dot.x += dot.vx;
                dot.y += dot.vy;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 1.5, Math.PI * 2, false);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        initDots();
        draw();

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', initDots);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        return () => {
            window.removeEventListener('resize', initDots);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [variant, size, fill]);

    if (variant === 'interactive-dots') {
        return (
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 z-[0] w-full h-full pointer-events-none ${className}`}
                style={{ ...style }}
                {...props}
            />
        );
    }

    const bgSize = `${size}px ${size}px`;
    const backgroundImage = geBgImage(variant, fill, size);

    return (
        <div
            className={`absolute inset-0 z-[0] w-full h-full pointer-events-none ${maskClasses[mask]} ${className}`}
            style={{
                backgroundImage,
                backgroundSize: bgSize,
                '--background': 'black',
                '--bg-size': `${size}px`,
                ...style,
            }}
            {...props}
        />
    );
};

BGPattern.displayName = 'BGPattern';
export { BGPattern };

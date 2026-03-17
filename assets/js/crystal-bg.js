/**
 * Crystal Structure Background
 * Renders a 2D projection of a perovskite ABX3 lattice:
 *   A-site  — large atoms at cell corners   (navy)
 *   B-site  — medium atoms at cell centers  (terracotta)
 *   X-site  — small atoms at edge midpoints (slate)
 * Bonds connect A–X and X–B as in the real cubic perovskite topology.
 * Atoms breathe slowly at random phase offsets.
 */
(function () {
    const CELL      = 88;   // unit-cell size in px
    const ATOM_R    = { A: 9.0, B: 6.0, X: 4.0 };
    const PULSE_AMP = 0.08; // fractional radius pulse
    const SPEED     = 0.006;

    let canvas, ctx, W, H, atoms = [], t = 0, raf;

    /* ── colour sets for light / dark ── */
    function colours() {
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        return dark ? {
            A:    { fill: 'rgba(96,165,250,0.28)',   stroke: 'rgba(96,165,250,0.55)'  },
            B:    { fill: 'rgba(249,115,22,0.22)',   stroke: 'rgba(249,115,22,0.46)'  },
            X:    { fill: 'rgba(147,197,253,0.18)',  stroke: 'rgba(147,197,253,0.40)' },
            bond: 'rgba(96,165,250,0.18)',
        } : {
            A:    { fill: 'rgba(26,86,219,0.16)',   stroke: 'rgba(26,86,219,0.36)'   },
            B:    { fill: 'rgba(194,65,12,0.14)',   stroke: 'rgba(194,65,12,0.32)'   },
            X:    { fill: 'rgba(96,130,220,0.12)',  stroke: 'rgba(96,130,220,0.28)'  },
            bond: 'rgba(26,86,219,0.14)',
        };
    }

    /* ── build atom list for current canvas size ── */
    function buildLattice() {
        atoms = [];
        const half = CELL / 2;
        const cols = Math.ceil(W / CELL) + 3;
        const rows = Math.ceil(H / CELL) + 3;
        for (let i = -1; i < cols; i++) {
            for (let j = -1; j < rows; j++) {
                const cx = i * CELL;
                const cy = j * CELL;
                const ph = () => Math.random() * Math.PI * 2;
                // A-site: corner
                atoms.push({ x: cx,        y: cy,        type: 'A', ph: ph() });
                // B-site: body-centre
                atoms.push({ x: cx + half, y: cy + half, type: 'B', ph: ph() });
                // X-site: right edge midpoint
                atoms.push({ x: cx + half, y: cy,        type: 'X', ph: ph() });
                // X-site: bottom edge midpoint
                atoms.push({ x: cx,        y: cy + half, type: 'X', ph: ph() });
            }
        }
    }

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        buildLattice();
    }

    function bond(x1, y1, x2, y2, c) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = c;
        ctx.lineWidth   = 1.0;
        ctx.stroke();
    }

    function frame() {
        ctx.clearRect(0, 0, W, H);
        t += SPEED;
        const c    = colours();
        const half = CELL / 2;

        /* draw bonds (A→X and X→B) */
        ctx.save();
        for (const a of atoms) {
            if (a.type !== 'A') continue;
            const { x, y } = a;
            // A  ── right-X  ── B (right-down)
            bond(x, y, x + half, y,    c.bond);
            // A  ── bottom-X ── B (right-down)
            bond(x, y, x, y + half,    c.bond);
            // right-X  ── B
            bond(x + half, y, x + half, y + half, c.bond);
            // bottom-X ── B
            bond(x, y + half, x + half, y + half, c.bond);
        }
        ctx.restore();

        /* draw atoms */
        for (const a of atoms) {
            const r = ATOM_R[a.type] * (1 + PULSE_AMP * Math.sin(t * 0.65 + a.ph));
            const col = c[a.type];
            ctx.beginPath();
            ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
            ctx.fillStyle   = col.fill;
            ctx.fill();
            ctx.strokeStyle = col.stroke;
            ctx.lineWidth   = 1;
            ctx.stroke();
        }

        raf = requestAnimationFrame(frame);
    }

    function init() {
        canvas = document.getElementById('crystal-bg');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', () => { resize(); });

        /* re-colour when theme toggles */
        const observer = new MutationObserver(() => {});
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        if (raf) cancelAnimationFrame(raf);
        frame();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

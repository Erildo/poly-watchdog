(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_newpage_d7cbb7._.js", {

"[project]/app/newpage/components/TradingChart.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "TradingChart": (()=>TradingChart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
function TradingChart({ candles, signals, pivots, currentPrice }) {
    _s();
    const chartContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const candlestickSeriesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pivotLinesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            if (!chartContainerRef.current) return;
            // Create chart
            const chart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChart"])(chartContainerRef.current, {
                layout: {
                    background: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorType"].Solid,
                        color: '#0a0a0a'
                    },
                    textColor: '#d1d5db'
                },
                grid: {
                    vertLines: {
                        color: '#1f1f1f'
                    },
                    horzLines: {
                        color: '#1f1f1f'
                    }
                },
                width: chartContainerRef.current.clientWidth,
                height: 600,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: false
                },
                rightPriceScale: {
                    borderColor: '#2a2e39'
                },
                crosshair: {
                    mode: 1
                }
            });
            chartRef.current = chart;
            // Add candlestick series
            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderUpColor: '#26a69a',
                borderDownColor: '#ef5350',
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350'
            });
            candlestickSeriesRef.current = candlestickSeries;
            // Handle resize
            const handleResize = {
                "TradingChart.useEffect.handleResize": ()=>{
                    if (chartContainerRef.current && chartRef.current) {
                        chartRef.current.applyOptions({
                            width: chartContainerRef.current.clientWidth
                        });
                    }
                }
            }["TradingChart.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "TradingChart.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                    chart.remove();
                }
            })["TradingChart.useEffect"];
        }
    }["TradingChart.useEffect"], []);
    // Update candles - DISPLAY LAST 3 WEEKS
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            if (!candlestickSeriesRef.current || candles.length === 0) return;
            // CHANGE THIS LINE to adjust chart timeframe:
            // 24 hours: const timeAgo = now - (24 * 60 * 60 * 1000);
            // 3 weeks: const timeAgo = now - (21 * 24 * 60 * 60 * 1000);
            const now = Date.now();
            const timeAgo = now - 21 * 24 * 60 * 60 * 1000; // 3 weeks
            const visibleCandles = candles.filter({
                "TradingChart.useEffect.visibleCandles": (c)=>c.time >= timeAgo
            }["TradingChart.useEffect.visibleCandles"]);
            // Format and deduplicate candles by timestamp
            const candleMap = new Map();
            visibleCandles.forEach({
                "TradingChart.useEffect": (candle)=>{
                    const timestamp = Math.floor(candle.time / 1000);
                    // Only keep the latest candle for each timestamp
                    if (!candleMap.has(timestamp) || candle.time > (candleMap.get(timestamp).originalTime || 0)) {
                        candleMap.set(timestamp, {
                            time: timestamp,
                            open: candle.open,
                            high: candle.high,
                            low: candle.low,
                            close: candle.close,
                            originalTime: candle.time
                        });
                    }
                }
            }["TradingChart.useEffect"]);
            // Convert to array and sort by time (ascending)
            const formattedCandles = Array.from(candleMap.values()).sort({
                "TradingChart.useEffect.formattedCandles": (a, b)=>a.time - b.time
            }["TradingChart.useEffect.formattedCandles"]).map({
                "TradingChart.useEffect.formattedCandles": ({ originalTime, ...candle })=>candle
            }["TradingChart.useEffect.formattedCandles"]); // Remove originalTime before setting
            try {
                candlestickSeriesRef.current.setData(formattedCandles);
            } catch (error) {
                console.error('Error setting candle data:', error);
                // If there's still an error, try clearing and re-adding
                candlestickSeriesRef.current.setData([]);
                setTimeout({
                    "TradingChart.useEffect": ()=>{
                        if (candlestickSeriesRef.current) {
                            candlestickSeriesRef.current.setData(formattedCandles);
                        }
                    }
                }["TradingChart.useEffect"], 100);
            }
        }
    }["TradingChart.useEffect"], [
        candles
    ]);
    // Add signal markers (Buy/Sell labels) - DISPLAY LAST 3 WEEKS
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            if (!candlestickSeriesRef.current || signals.length === 0) return;
            // Filter signals to match visible timeframe (3 weeks)
            const now = Date.now();
            const timeAgo = now - 21 * 24 * 60 * 60 * 1000; // 3 weeks
            const visibleSignals = signals.filter({
                "TradingChart.useEffect.visibleSignals": (s)=>s.time >= timeAgo
            }["TradingChart.useEffect.visibleSignals"]);
            const markers = visibleSignals.map({
                "TradingChart.useEffect.markers": (signal)=>({
                        time: Math.floor(signal.time / 1000),
                        position: signal.type === 'buy' ? 'belowBar' : 'aboveBar',
                        color: signal.type === 'buy' ? '#22c55e' : '#ef4444',
                        shape: 'arrowUp',
                        text: signal.type === 'buy' ? 'Buy' : 'Sell',
                        size: 1
                    })
            }["TradingChart.useEffect.markers"]);
            candlestickSeriesRef.current.setMarkers(markers);
        }
    }["TradingChart.useEffect"], [
        signals
    ]);
    // Add Camarilla pivot lines
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            if (!chartRef.current || !pivots) return;
            // Remove old pivot lines
            pivotLinesRef.current.forEach({
                "TradingChart.useEffect": (line)=>{
                    try {
                        chartRef.current?.removeSeries(line);
                    } catch (e) {
                    // Line already removed
                    }
                }
            }["TradingChart.useEffect"]);
            pivotLinesRef.current = [];
            // Get visible timeframe for line span
            const now = Date.now();
            const timeAgo = now - 21 * 24 * 60 * 60 * 1000; // 3 weeks
            const visibleCandles = candles.filter({
                "TradingChart.useEffect.visibleCandles": (c)=>c.time >= timeAgo
            }["TradingChart.useEffect.visibleCandles"]);
            if (visibleCandles.length === 0) return;
            // Daily levels with proper colors
            const levels = [
                // Resistance levels (orange - #e05d29)
                {
                    price: pivots.h5,
                    color: '#e05d29',
                    label: 'H5',
                    lineWidth: 2
                },
                {
                    price: pivots.r4,
                    color: '#e05d29',
                    label: 'H4',
                    lineWidth: 2
                },
                {
                    price: pivots.r3,
                    color: '#e05d29',
                    label: 'H3',
                    lineWidth: 2
                },
                {
                    price: pivots.r2,
                    color: '#e05d29',
                    label: 'H2',
                    lineWidth: 2
                },
                {
                    price: pivots.r1,
                    color: '#e05d29',
                    label: 'H1',
                    lineWidth: 2
                },
                // Center (white - #e4e3e7)
                {
                    price: pivots.center,
                    color: '#e4e3e7',
                    label: 'Center',
                    lineWidth: 2
                },
                // Support levels (teal - #008080)
                {
                    price: pivots.s1,
                    color: '#008080',
                    label: 'L1',
                    lineWidth: 2
                },
                {
                    price: pivots.s2,
                    color: '#008080',
                    label: 'L2',
                    lineWidth: 2
                },
                {
                    price: pivots.s3,
                    color: '#008080',
                    label: 'L3',
                    lineWidth: 2
                },
                {
                    price: pivots.s4,
                    color: '#008080',
                    label: 'L4',
                    lineWidth: 2
                },
                {
                    price: pivots.l5,
                    color: '#008080',
                    label: 'L5',
                    lineWidth: 2
                }
            ];
            // Weekly levels (cyan - rgb(64, 215, 235))
            if (pivots.weeklyCenter !== undefined) {
                levels.push({
                    price: pivots.weeklyCenter,
                    color: 'rgb(64, 215, 235)',
                    label: 'WCenter',
                    lineWidth: 1
                }, {
                    price: pivots.weekly_h3,
                    color: 'rgb(64, 215, 235)',
                    label: 'WH3',
                    lineWidth: 1
                }, {
                    price: pivots.weekly_l3,
                    color: 'rgb(64, 215, 235)',
                    label: 'WL3',
                    lineWidth: 1
                });
            }
            // Monthly levels (light green - #8cfcc4)
            if (pivots.monthlyCenter !== undefined) {
                levels.push({
                    price: pivots.monthlyCenter,
                    color: '#8cfcc4',
                    label: 'MCenter',
                    lineWidth: 1
                }, {
                    price: pivots.monthly_h3,
                    color: '#8cfcc4',
                    label: 'MH3',
                    lineWidth: 1
                }, {
                    price: pivots.monthly_h4,
                    color: '#8cfcc4',
                    label: 'MH4',
                    lineWidth: 1
                }, {
                    price: pivots.monthly_l3,
                    color: '#8cfcc4',
                    label: 'ML3',
                    lineWidth: 1
                }, {
                    price: pivots.monthly_l4,
                    color: '#8cfcc4',
                    label: 'ML4',
                    lineWidth: 1
                });
            }
            levels.forEach({
                "TradingChart.useEffect": (level)=>{
                    const lineSeries = chartRef.current.addLineSeries({
                        color: level.color,
                        lineWidth: level.lineWidth,
                        lineStyle: 0,
                        priceLineVisible: true,
                        lastValueVisible: true,
                        title: level.label
                    });
                    // Store reference to remove later
                    pivotLinesRef.current.push(lineSeries);
                    // Create horizontal line data spanning the visible range (3 weeks)
                    const lineData = [
                        {
                            time: Math.floor(visibleCandles[0].time / 1000),
                            value: level.price
                        },
                        {
                            time: Math.floor(visibleCandles[visibleCandles.length - 1].time / 1000),
                            value: level.price
                        }
                    ];
                    lineSeries.setData(lineData);
                }
            }["TradingChart.useEffect"]);
        }
    }["TradingChart.useEffect"], [
        pivots,
        candles
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: chartContainerRef,
                className: "rounded-lg overflow-hidden border border-gray-800"
            }, void 0, false, {
                fileName: "[project]/app/newpage/components/TradingChart.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            currentPrice > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400",
                        children: "BTC/USDT"
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/TradingChart.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-2xl font-bold text-white",
                        children: [
                            "$",
                            currentPrice.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/TradingChart.tsx",
                        lineNumber: 239,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/TradingChart.tsx",
                lineNumber: 237,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/newpage/components/TradingChart.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
_s(TradingChart, "lNL6ZWqX0wqj2dGrCqC8Vgw47/U=");
_c = TradingChart;
var _c;
__turbopack_refresh__.register(_c, "TradingChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/components/CombinedSignalAlerts.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "CombinedSignalAlerts": (()=>CombinedSignalAlerts)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function CombinedSignalAlerts({ latestSignal, currentPrice, alerts }) {
    const isRecent = latestSignal && Date.now() - latestSignal.time < 5 * 60 * 1000; // 5 minutes
    const priceDiff = latestSignal ? currentPrice - latestSignal.price : 0;
    const priceDiffPercent = latestSignal ? priceDiff / latestSignal.price * 100 : 0;
    const signalColor = latestSignal?.type === 'buy' ? 'text-green-400' : 'text-red-400';
    const bgColor = latestSignal?.type === 'buy' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30';
    const probabilityColor = latestSignal ? ({
        high: 'text-green-400 bg-green-500/20',
        mid: 'text-yellow-400 bg-yellow-500/20',
        low: 'text-orange-400 bg-orange-500/20'
    })[latestSignal.probability] : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-900 rounded-xl border border-gray-700 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-6 border-b border-gray-700 ${latestSignal ? bgColor : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-gray-300",
                                children: "Current Signal"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            isRecent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full animate-pulse",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    !latestSignal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-500 text-sm",
                                children: "No active signals"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 mt-2",
                                children: "Waiting for reversal setup..."
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 mb-1",
                                        children: "Direction"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-2xl font-bold ${signalColor} uppercase`,
                                        children: latestSignal.type === 'buy' ? '↗ Buy' : '↘ Sell'
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 mb-2",
                                        children: "Confidence"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 bg-gray-700 rounded-full h-2 overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-full ${latestSignal.type === 'buy' ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`,
                                                    style: {
                                                        width: `${latestSignal.confidence}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                lineNumber: 59,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-bold text-white",
                                                children: [
                                                    latestSignal.confidence,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 mb-1",
                                        children: "Probability"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-1 rounded text-xs font-medium ${probabilityColor}`,
                                        children: latestSignal.probability.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 mb-1",
                                        children: "Signal Price"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-mono text-white",
                                        children: [
                                            "$",
                                            latestSignal.price.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            currentPrice > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 mb-1",
                                        children: "Movement"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-base font-mono ${priceDiff >= 0 ? 'text-green-400' : 'text-red-400'}`,
                                        children: [
                                            priceDiff >= 0 ? '+' : '',
                                            priceDiff.toFixed(2),
                                            " (",
                                            priceDiffPercent.toFixed(2),
                                            "%)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-300 mb-4",
                        children: [
                            "Recent Alerts ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 text-sm",
                                children: [
                                    "(",
                                    alerts.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 98,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    alerts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-500 text-sm",
                            children: "No alerts yet"
                        }, void 0, false, {
                            fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar",
                        children: alerts.slice(0, 5).map((alert)=>{
                            const isWin = alert.outcome === 'win';
                            const isLoss = alert.outcome === 'loss';
                            const isPending = alert.outcome === 'pending' || !alert.outcome;
                            const directionColor = alert.direction === 'up' ? 'text-green-400' : 'text-red-400';
                            const directionBg = alert.direction === 'up' ? 'bg-green-500/5' : 'bg-red-500/5';
                            const directionIcon = alert.direction === 'up' ? '↗' : '↘';
                            const outcomeColor = isWin ? 'text-green-400' : isLoss ? 'text-red-400' : 'text-gray-400';
                            const outcomeLabel = isWin ? '✓' : isLoss ? '✗' : '⋯';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-3 rounded-lg border ${directionBg} border-gray-700 hover:border-gray-600 transition-colors`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-lg ${directionColor}`,
                                                        children: directionIcon
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-semibold ${directionColor} uppercase text-sm`,
                                                        children: alert.direction
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500 uppercase",
                                                        children: alert.probability
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                lineNumber: 125,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-sm font-medium ${outcomeColor}`,
                                                children: outcomeLabel
                                            }, void 0, false, {
                                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                lineNumber: 134,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 124,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-2 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-500",
                                                        children: "Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-white",
                                                        children: [
                                                            "$",
                                                            alert.price.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-500",
                                                        children: "Conf."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-white",
                                                        children: [
                                                            alert.confidence,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                lineNumber: 144,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-500",
                                                        children: "Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-400",
                                                        children: new Date(alert.timestamp).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                                lineNumber: 148,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                        lineNumber: 139,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, alert.id, true, {
                                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                                lineNumber: 120,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/newpage/components/CombinedSignalAlerts.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = CombinedSignalAlerts;
var _c;
__turbopack_refresh__.register(_c, "CombinedSignalAlerts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/lib/store.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// BTC Dashboard State Store
__turbopack_esm__({
    "useBTCStore": (()=>useBTCStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useBTCStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Initial state
        currentPrice: 0,
        candles: [],
        activeSignals: [],
        pivots: null,
        alerts: [],
        config: {
            discordWebhook: '',
            enableHighProb: true,
            enableMidProb: false,
            enableLowProb: false,
            alertThreshold: 75,
            timeframe: '1m'
        },
        // Actions
        setCurrentPrice: (price)=>set({
                currentPrice: price
            }),
        addCandle: (candle)=>set((state)=>{
                // Check if candle with same timestamp already exists
                const existingIndex = state.candles.findIndex((c)=>c.time === candle.time);
                if (existingIndex !== -1) {
                    // Update existing candle instead of adding duplicate
                    const updatedCandles = [
                        ...state.candles
                    ];
                    updatedCandles[existingIndex] = candle;
                    return {
                        candles: updatedCandles.slice(-30240)
                    }; // Keep last 3 weeks
                }
                // Add new candle
                return {
                    candles: [
                        ...state.candles.slice(-30240),
                        candle
                    ]
                }; // Keep last 3 weeks
            }),
        setCandles: (candles)=>set({
                candles
            }),
        addSignal: (signal)=>set((state)=>({
                    activeSignals: [
                        ...state.activeSignals.slice(-50),
                        signal
                    ]
                })),
        setPivots: (pivots)=>set({
                pivots
            }),
        addAlert: (alert)=>set((state)=>({
                    alerts: [
                        alert,
                        ...state.alerts.slice(0, 99)
                    ] // Keep last 100 alerts
                })),
        updateAlert: (id, update)=>set((state)=>({
                    alerts: state.alerts.map((alert)=>alert.id === id ? {
                            ...alert,
                            ...update
                        } : alert)
                })),
        updateConfig: (config)=>set((state)=>({
                    config: {
                        ...state.config,
                        ...config
                    }
                })),
        clearAlerts: ()=>set({
                alerts: []
            })
    }), {
    name: 'btc-dashboard-storage',
    partialize: (state)=>({
            alerts: state.alerts,
            config: state.config
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/components/SettingsPanel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SettingsPanel": (()=>SettingsPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/lib/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
function SettingsPanel() {
    _s();
    const { config, updateConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBTCStore"])();
    const [webhookInput, setWebhookInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(config.discordWebhook);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSaveWebhook = ()=>{
        updateConfig({
            discordWebhook: webhookInput
        });
        setShowSuccess(true);
        setTimeout(()=>setShowSuccess(false), 3000);
    };
    const handleToggle = (key, value)=>{
        updateConfig({
            [key]: value
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-900 rounded-xl p-6 border border-gray-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-gray-300 mb-4",
                children: "Settings"
            }, void 0, false, {
                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-medium text-gray-400 mb-2",
                        children: "Discord Webhook URL"
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: webhookInput,
                                onChange: (e)=>setWebhookInput(e.target.value),
                                placeholder: "https://discord.com/api/webhooks/...",
                                className: "flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSaveWebhook,
                                className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors",
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-xs text-green-400 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Saved!"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-medium text-gray-400 mb-2",
                        children: "Signal Types"
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-green-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-medium text-white",
                                        children: "High (95%)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: config.enableHighProb,
                                onChange: (e)=>handleToggle('enableHighProb', e.target.checked),
                                className: "w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-yellow-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-medium text-white",
                                        children: "Mid (75%)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: config.enableMidProb,
                                onChange: (e)=>handleToggle('enableMidProb', e.target.checked),
                                className: "w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-orange-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-medium text-white",
                                        children: "Low (55%)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: config.enableLowProb,
                                onChange: (e)=>handleToggle('enableLowProb', e.target.checked),
                                className: "w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center justify-between text-xs font-medium text-gray-400 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Alert Threshold"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: [
                                    config.alertThreshold,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: "50",
                        max: "100",
                        step: "5",
                        value: config.alertThreshold,
                        onChange: (e)=>updateConfig({
                                alertThreshold: parseInt(e.target.value)
                            }),
                        className: "w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-medium text-gray-400 mb-2",
                        children: "Chart Timeframe"
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>updateConfig({
                                        timeframe: '1m'
                                    }),
                                className: `flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${config.timeframe === '1m' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-750'}`,
                                children: "1m"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>updateConfig({
                                        timeframe: '15m'
                                    }),
                                className: `flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${config.timeframe === '15m' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-750'}`,
                                children: "15m"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>updateConfig({
                                        timeframe: '45m'
                                    }),
                                className: `flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${config.timeframe === '45m' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-750'}`,
                                children: "45m"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-400",
                            children: config.discordWebhook ? 'Discord connected' : 'No webhook'
                        }, void 0, false, {
                            fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-2 h-2 rounded-full ${config.discordWebhook ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`
                        }, void 0, false, {
                            fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/newpage/components/SettingsPanel.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(SettingsPanel, "ZLNDtcMB9pub+I63W81+Ky5jcp0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBTCStore"]
    ];
});
_c = SettingsPanel;
var _c;
__turbopack_refresh__.register(_c, "SettingsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/components/PerformanceMetrics.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "PerformanceMetrics": (()=>PerformanceMetrics)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function PerformanceMetrics({ alerts }) {
    const totalAlerts = alerts.length;
    const completedAlerts = alerts.filter((a)=>a.outcome === 'win' || a.outcome === 'loss');
    const wins = alerts.filter((a)=>a.outcome === 'win').length;
    const losses = alerts.filter((a)=>a.outcome === 'loss').length;
    const pending = totalAlerts - completedAlerts.length;
    const winRate = completedAlerts.length > 0 ? (wins / completedAlerts.length * 100).toFixed(1) : '0.0';
    // Calculate by probability level
    const highProbAlerts = alerts.filter((a)=>a.probability === 'high');
    const midProbAlerts = alerts.filter((a)=>a.probability === 'mid');
    const lowProbAlerts = alerts.filter((a)=>a.probability === 'low');
    const calculateStats = (alerts)=>{
        const completed = alerts.filter((a)=>a.outcome === 'win' || a.outcome === 'loss');
        const wins = alerts.filter((a)=>a.outcome === 'win').length;
        return {
            total: alerts.length,
            wins,
            winRate: completed.length > 0 ? (wins / completed.length * 100).toFixed(1) : '0.0'
        };
    };
    const highStats = calculateStats(highProbAlerts);
    const midStats = calculateStats(midProbAlerts);
    const lowStats = calculateStats(lowProbAlerts);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-900 rounded-xl p-6 border border-gray-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-gray-300 mb-4",
                children: "Performance Metrics"
            }, void 0, false, {
                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-3 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800 rounded-lg p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-1",
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl font-bold text-white",
                                children: totalAlerts
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-500/10 border border-green-500/30 rounded-lg p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-1",
                                children: "Wins"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl font-bold text-green-400",
                                children: wins
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-500/10 border border-red-500/30 rounded-lg p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-1",
                                children: "Loss"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl font-bold text-red-400",
                                children: losses
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-500/10 border border-blue-500/30 rounded-lg p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-1",
                                children: "Rate"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl font-bold text-blue-400",
                                children: [
                                    winRate,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-sm mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400",
                                children: "Win Rate"
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-semibold",
                                children: [
                                    winRate,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-gray-700 rounded-full h-2 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500",
                            style: {
                                width: `${Math.min(parseFloat(winRate), 100)}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-medium text-gray-400 mb-2",
                        children: "By Probability"
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between bg-gray-800 rounded p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-green-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-green-400",
                                        children: "High"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500",
                                        children: highStats.total
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-white",
                                children: [
                                    highStats.winRate,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between bg-gray-800 rounded p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-yellow-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-yellow-400",
                                        children: "Mid"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500",
                                        children: midStats.total
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-white",
                                children: [
                                    midStats.winRate,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between bg-gray-800 rounded p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-orange-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-orange-400",
                                        children: "Low"
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500",
                                        children: lowStats.total
                                    }, void 0, false, {
                                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-white",
                                children: [
                                    lowStats.winRate,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            pending > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-blue-400",
                    children: [
                        pending,
                        " pending"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                    lineNumber: 115,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/newpage/components/PerformanceMetrics.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = PerformanceMetrics;
var _c;
__turbopack_refresh__.register(_c, "PerformanceMetrics");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/hooks/useBTCPrice.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Custom hook for real-time BTC price data
__turbopack_esm__({
    "fetchBTCPriceCoinGecko": (()=>fetchBTCPriceCoinGecko),
    "fetchHistoricalCandles": (()=>fetchHistoricalCandles),
    "useBTCPriceStream": (()=>useBTCPriceStream)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/lib/store.ts [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
;
function useBTCPriceStream() {
    _s();
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { addCandle, setCurrentPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBTCStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBTCPriceStream.useEffect": ()=>{
            // Connect to Binance WebSocket for BTC/USDT 1-minute klines
            const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');
            wsRef.current = ws;
            ws.onopen = ({
                "useBTCPriceStream.useEffect": ()=>{
                    console.log('✅ Connected to Binance WebSocket');
                }
            })["useBTCPriceStream.useEffect"];
            ws.onmessage = ({
                "useBTCPriceStream.useEffect": (event)=>{
                    try {
                        const data = JSON.parse(event.data);
                        if (data.e === 'kline') {
                            const kline = data.k;
                            // Update current price continuously
                            const currentClose = parseFloat(kline.c);
                            setCurrentPrice(currentClose);
                            // Only add candle when it's closed (x = true)
                            if (kline.x) {
                                const candle = {
                                    time: kline.t,
                                    open: parseFloat(kline.o),
                                    high: parseFloat(kline.h),
                                    low: parseFloat(kline.l),
                                    close: parseFloat(kline.c),
                                    volume: parseFloat(kline.v)
                                };
                                addCandle(candle);
                            }
                        }
                    } catch (error) {
                        console.error('Error parsing WebSocket data:', error);
                    }
                }
            })["useBTCPriceStream.useEffect"];
            ws.onerror = ({
                "useBTCPriceStream.useEffect": (error)=>{
                    console.error('WebSocket error:', error);
                }
            })["useBTCPriceStream.useEffect"];
            ws.onclose = ({
                "useBTCPriceStream.useEffect": ()=>{
                    console.log('WebSocket disconnected. Reconnecting...');
                    // Reconnect after 3 seconds
                    setTimeout({
                        "useBTCPriceStream.useEffect": ()=>{
                            if (wsRef.current?.readyState === WebSocket.CLOSED) {
                                window.location.reload(); // Simple reconnect strategy
                            }
                        }
                    }["useBTCPriceStream.useEffect"], 3000);
                }
            })["useBTCPriceStream.useEffect"];
            return ({
                "useBTCPriceStream.useEffect": ()=>{
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.close();
                    }
                }
            })["useBTCPriceStream.useEffect"];
        }
    }["useBTCPriceStream.useEffect"], [
        addCandle,
        setCurrentPrice
    ]);
}
_s(useBTCPriceStream, "fUMqsAg0RFKh9b8tLwlbGpSzAhE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBTCStore"]
    ];
});
async function fetchHistoricalCandles(limit = 1000) {
    try {
        // Binance API max limit is 1000, so we need multiple calls for 3 weeks (30,240 candles)
        const allCandles = [];
        const maxLimit = 1000;
        const totalCandles = 30240; // 21 days * 24 hours * 60 minutes (3 weeks)
        const calls = Math.ceil(totalCandles / maxLimit);
        let endTime = Date.now();
        for(let i = 0; i < calls; i++){
            const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=${maxLimit}&endTime=${endTime}`);
            if (!response.ok) {
                throw new Error('Failed to fetch historical data');
            }
            const data = await response.json();
            const candles = data.map((kline)=>({
                    time: kline[0],
                    open: parseFloat(kline[1]),
                    high: parseFloat(kline[2]),
                    low: parseFloat(kline[3]),
                    close: parseFloat(kline[4]),
                    volume: parseFloat(kline[5])
                }));
            allCandles.unshift(...candles);
            // Set endTime to the earliest candle's time for next call
            if (candles.length > 0) {
                endTime = candles[0].time - 1;
            }
            // Break if we got less than requested (reached the end)
            if (data.length < maxLimit) {
                break;
            }
        }
        return allCandles.slice(-totalCandles); // Return last 3 weeks
    } catch (error) {
        console.error('Error fetching historical candles:', error);
        return [];
    }
}
async function fetchBTCPriceCoinGecko() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        return data.bitcoin?.usd || null;
    } catch (error) {
        console.error('Error fetching BTC price from CoinGecko:', error);
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/lib/ucs-indicator.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// UCS_Extreme Snap Back Indicator (OPTIMIZED)
// Converted from Pine Script v3
__turbopack_esm__({
    "UCSIndicator": (()=>UCSIndicator)
});
// Simple Moving Average
function sma(data, period) {
    if (data.length < period) return data[data.length - 1] || 0;
    const slice = data.slice(-period);
    return slice.reduce((sum, val)=>sum + val, 0) / period;
}
// True Range
function trueRange(candle, prevClose) {
    const h_l = candle.high - candle.low;
    const h_pc = Math.abs(candle.high - prevClose);
    const l_pc = Math.abs(candle.low - prevClose);
    return Math.max(h_l, h_pc, l_pc);
}
// OHLC4 calculation
function ohlc4(candle) {
    return (candle.open + candle.high + candle.low + candle.close) / 4;
}
class UCSIndicator {
    len1 = 7;
    len2 = 14;
    len3 = 21;
    len4 = 32;
    // Cache to avoid recalculating all signals every time
    lastProcessedTime = 0;
    cachedSignals = [];
    calculate(candles, config) {
        if (candles.length < this.len4) {
            return {
                signals: [],
                indicators: null
            };
        }
        // Only process NEW candles since last time
        const newCandles = candles.filter((c)=>c.time > this.lastProcessedTime);
        if (newCandles.length > 0) {
            // Process each new candle
            for(let i = 0; i < newCandles.length; i++){
                const currentCandleTime = newCandles[i].time;
                const currentIndex = candles.findIndex((c)=>c.time === currentCandleTime);
                if (currentIndex < this.len4) continue;
                // Get window of last 100 candles for calculation (performance optimization)
                const windowStart = Math.max(0, currentIndex - 99);
                const windowCandles = candles.slice(windowStart, currentIndex + 1);
                // Build src and tr arrays
                const srcHistory = windowCandles.map((c)=>ohlc4(c));
                const trHistory = windowCandles.map((c, idx)=>{
                    if (idx === 0) return c.high - c.low;
                    return trueRange(c, windowCandles[idx - 1].close);
                });
                // Calculate MAs
                const ma1 = sma(srcHistory, this.len1);
                const ma2 = sma(srcHistory, this.len2);
                // Calculate ATR ranges
                const rng1 = sma(trHistory, this.len1);
                const rng2 = sma(trHistory, this.len2);
                const rng3 = sma(trHistory, this.len3);
                // Calculate bands
                const up1 = ma1 + rng1 * 1.6;
                const up2 = ma2 + rng2 * 2.4;
                const up3 = ma2 + rng3 * 3.2;
                const dn1 = ma1 - rng1 * 1.6;
                const dn2 = ma2 - rng2 * 2.4;
                const dn3 = ma2 - rng2 * 3.2;
                const currentCandle = windowCandles[windowCandles.length - 1];
                // Check previous candle to avoid consecutive duplicates
                let prevHigh = 0;
                let prevLow = 0;
                if (currentIndex > 0) {
                    const prevCandle = candles[currentIndex - 1];
                    // Simplified check using last calculated values
                    const ERhigh3_prev = prevCandle.high > up1 && prevCandle.high > up2 && prevCandle.high > up3 ? 1 : 0;
                    const ERlow3_prev = prevCandle.low < dn1 && prevCandle.low < dn2 && prevCandle.low < dn3 ? 1 : 0;
                    prevHigh = ERhigh3_prev;
                    prevLow = ERlow3_prev;
                }
                // Check current candle conditions
                const ERhigh1 = currentCandle.high > up1 ? 1 : 0;
                const ERlow1 = currentCandle.low < dn1 ? 1 : 0;
                const ERhigh2 = currentCandle.high > up1 && currentCandle.high > up2 ? 1 : 0;
                const ERlow2 = currentCandle.low < dn1 && currentCandle.low < dn2 ? 1 : 0;
                const ERhigh3 = currentCandle.high > up1 && currentCandle.high > up2 && currentCandle.high > up3 ? 1 : 0;
                const ERlow3 = currentCandle.low < dn1 && currentCandle.low < dn2 && currentCandle.low < dn3 ? 1 : 0;
                // Detect signals
                const HiPERh = config.highProb && prevHigh !== 1 && ERhigh3 ? 1 : 0;
                const HiPERl = config.highProb && prevLow !== 1 && ERlow3 ? 1 : 0;
                const MiPERh = config.midProb && HiPERh === 0 && prevHigh !== 1 && ERhigh2 ? 1 : 0;
                const MiPERl = config.midProb && HiPERl === 0 && prevLow !== 1 && ERlow2 ? 1 : 0;
                const LoPERh = config.lowProb && HiPERh === 0 && MiPERh === 0 && prevHigh !== 1 && ERhigh1 ? 1 : 0;
                const LoPERl = config.lowProb && HiPERl === 0 && MiPERl === 0 && prevLow !== 1 && ERlow1 ? 1 : 0;
                // Add signals to cache
                if (HiPERh === 1) {
                    this.cachedSignals.push({
                        time: currentCandle.time,
                        price: currentCandle.high,
                        type: 'sell',
                        probability: 'high',
                        confidence: 95
                    });
                }
                if (HiPERl === 1) {
                    this.cachedSignals.push({
                        time: currentCandle.time,
                        price: currentCandle.low,
                        type: 'buy',
                        probability: 'high',
                        confidence: 95
                    });
                }
                if (MiPERh === 1) {
                    this.cachedSignals.push({
                        time: currentCandle.time,
                        price: currentCandle.high,
                        type: 'sell',
                        probability: 'mid',
                        confidence: 75
                    });
                }
                if (MiPERl === 1) {
                    this.cachedSignals.push({
                        time: currentCandle.time,
                        price: currentCandle.low,
                        type: 'buy',
                        probability: 'mid',
                        confidence: 75
                    });
                }
                if (LoPERh === 1) {
                    this.cachedSignals.push({
                        time: currentCandle.time,
                        price: currentCandle.high,
                        type: 'sell',
                        probability: 'low',
                        confidence: 55
                    });
                }
                if (LoPERl === 1) {
                    this.cachedSignals.push({
                        time: currentCandle.time,
                        price: currentCandle.low,
                        type: 'buy',
                        probability: 'low',
                        confidence: 55
                    });
                }
            }
            // Update last processed time
            if (newCandles.length > 0) {
                this.lastProcessedTime = newCandles[newCandles.length - 1].time;
            }
        }
        // Calculate indicator values for display (using last 100 candles for performance)
        const recentCandles = candles.slice(-100);
        const srcHistory = recentCandles.map((c)=>ohlc4(c));
        const trHistory = recentCandles.map((c, i)=>{
            if (i === 0) return c.high - c.low;
            return trueRange(c, recentCandles[i - 1].close);
        });
        const ma1 = sma(srcHistory, this.len1);
        const ma2 = sma(srcHistory, this.len2);
        const ma3 = sma(srcHistory, this.len3);
        const ma4 = sma(srcHistory, this.len4);
        const rng1 = sma(trHistory, this.len1);
        const rng2 = sma(trHistory, this.len2);
        const rng3 = sma(trHistory, this.len3);
        const up1 = ma1 + rng1 * 1.6;
        const up2 = ma2 + rng2 * 2.4;
        const up3 = ma2 + rng3 * 3.2;
        const dn1 = ma1 - rng1 * 1.6;
        const dn2 = ma2 - rng2 * 2.4;
        const dn3 = ma2 - rng2 * 3.2;
        return {
            signals: this.cachedSignals,
            indicators: {
                ma1,
                ma2,
                ma3,
                ma4,
                up1,
                up2,
                up3,
                dn1,
                dn2,
                dn3
            }
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/lib/camarilla.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Camarilla Pivot Points Calculator
// Converted from Pine Script v4
__turbopack_esm__({
    "calculateCamarillaPivots": (()=>calculateCamarillaPivots),
    "getDailyCandle": (()=>getDailyCandle),
    "getMonthlyCandle": (()=>getMonthlyCandle),
    "getWeeklyCandle": (()=>getWeeklyCandle)
});
function calculateCamarillaPivots(dailyCandle, weeklyCandle, monthlyCandle) {
    const { high: shigh, low: slow, close: sclose, open: sopen } = dailyCandle;
    // Calculate range
    const r = shigh - slow;
    // Daily Camarilla Pivots (using previous day's data)
    const center = sclose;
    const h1 = sclose + r * (1.1 / 12);
    const h2 = sclose + r * (1.1 / 6);
    const h3 = sclose + r * (1.1 / 4);
    const h4 = sclose + r * (1.1 / 2);
    const h5 = shigh / slow * sclose;
    const l1 = sclose - r * (1.1 / 12);
    const l2 = sclose - r * (1.1 / 6);
    const l3 = sclose - r * (1.1 / 4);
    const l4 = sclose - r * (1.1 / 2);
    const l5 = sclose - (h5 - sclose);
    const pivots = {
        r4: Number(h4.toFixed(2)),
        r3: Number(h3.toFixed(2)),
        r2: Number(h2.toFixed(2)),
        r1: Number(h1.toFixed(2)),
        pp: Number(center.toFixed(2)),
        s1: Number(l1.toFixed(2)),
        s2: Number(l2.toFixed(2)),
        s3: Number(l3.toFixed(2)),
        s4: Number(l4.toFixed(2)),
        h5: Number(h5.toFixed(2)),
        l5: Number(l5.toFixed(2)),
        center: Number(center.toFixed(2))
    };
    // Weekly pivots (if provided)
    if (weeklyCandle) {
        const { high: wh, low: wl, close: wc } = weeklyCandle;
        const r1 = wh - wl;
        pivots.weeklyCenter = Number(wc.toFixed(2));
        pivots.weekly_h3 = Number((wc + r1 * (1.1 / 4)).toFixed(2));
        pivots.weekly_l3 = Number((wc - r1 * (1.1 / 4)).toFixed(2));
    }
    // Monthly pivots (if provided)
    if (monthlyCandle) {
        const { high: mh, low: ml, close: mc } = monthlyCandle;
        const Mr1 = mh - ml;
        pivots.monthlyCenter = Number(mc.toFixed(2));
        pivots.monthly_h3 = Number((mc + Mr1 * (1.1 / 4)).toFixed(2));
        pivots.monthly_l3 = Number((mc - Mr1 * (1.1 / 4)).toFixed(2));
        pivots.monthly_h4 = Number((mc + Mr1 * (1.1 / 2)).toFixed(2));
        pivots.monthly_l4 = Number((mc - Mr1 * (1.1 / 2)).toFixed(2));
    }
    return pivots;
}
function getDailyCandle(candles) {
    if (candles.length === 0) return null;
    const now = new Date();
    // Get yesterday's date in UTC (00:00:00 to 23:59:59 UTC)
    const yesterday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 0, 0, 0, 0));
    const yesterdayEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 23, 59, 59, 999));
    const yesterdayStartTime = yesterday.getTime();
    const yesterdayEndTime = yesterdayEnd.getTime();
    // Filter candles from yesterday (00:00 to 23:59 UTC)
    const yesterdayCandles = candles.filter((c)=>c.time >= yesterdayStartTime && c.time <= yesterdayEndTime);
    if (yesterdayCandles.length === 0) {
        console.log('No candles found for yesterday UTC, using fallback');
        // Fallback: use last complete 1440 candles (24 hours)
        const last24h = candles.slice(-2880, -1440);
        if (last24h.length === 0) return null;
        const high = Math.max(...last24h.map((c)=>c.high));
        const low = Math.min(...last24h.map((c)=>c.low));
        const close = last24h[last24h.length - 1].close;
        const open = last24h[0].open;
        return {
            time: last24h[last24h.length - 1].time,
            open,
            high,
            low,
            close
        };
    }
    const high = Math.max(...yesterdayCandles.map((c)=>c.high));
    const low = Math.min(...yesterdayCandles.map((c)=>c.low));
    const close = yesterdayCandles[yesterdayCandles.length - 1].close;
    const open = yesterdayCandles[0].open;
    console.log('Daily Candle (UTC Yesterday):', {
        open,
        high,
        low,
        close,
        candleCount: yesterdayCandles.length
    });
    return {
        time: yesterdayCandles[yesterdayCandles.length - 1].time,
        open,
        high,
        low,
        close
    };
}
function getWeeklyCandle(candles) {
    if (candles.length === 0) return null;
    const now = new Date();
    // Get last week's Monday 00:00:00
    const lastWeekMonday = new Date(now);
    const dayOfWeek = now.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 13 : dayOfWeek + 6; // If Sunday, go back 13 days, else current day + 6
    lastWeekMonday.setDate(now.getDate() - daysToSubtract);
    lastWeekMonday.setHours(0, 0, 0, 0);
    // Get last week's Sunday 23:59:59
    const lastWeekSunday = new Date(lastWeekMonday);
    lastWeekSunday.setDate(lastWeekMonday.getDate() + 6);
    lastWeekSunday.setHours(23, 59, 59, 999);
    const weekStartTime = lastWeekMonday.getTime();
    const weekEndTime = lastWeekSunday.getTime();
    const weekCandles = candles.filter((c)=>c.time >= weekStartTime && c.time <= weekEndTime);
    if (weekCandles.length === 0) {
        console.log('No candles found for last week');
        return null;
    }
    const high = Math.max(...weekCandles.map((c)=>c.high));
    const low = Math.min(...weekCandles.map((c)=>c.low));
    const close = weekCandles[weekCandles.length - 1].close;
    const open = weekCandles[0].open;
    return {
        time: weekCandles[weekCandles.length - 1].time,
        open,
        high,
        low,
        close
    };
}
function getMonthlyCandle(candles) {
    if (candles.length === 0) return null;
    const now = new Date();
    // Get previous month (1st day at 00:00:00 to last day at 23:59:59)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    const monthStartTime = lastMonth.getTime();
    const monthEndTime = lastMonthEnd.getTime();
    const monthCandles = candles.filter((c)=>{
        return c.time >= monthStartTime && c.time <= monthEndTime;
    });
    if (monthCandles.length === 0) {
        console.log('No candles found for last month');
        return null;
    }
    const high = Math.max(...monthCandles.map((c)=>c.high));
    const low = Math.min(...monthCandles.map((c)=>c.low));
    const close = monthCandles[monthCandles.length - 1].close;
    const open = monthCandles[0].open;
    return {
        time: monthCandles[monthCandles.length - 1].time,
        open,
        high,
        low,
        close
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/lib/discord.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Discord Alert System
__turbopack_esm__({
    "formatAlertMessage": (()=>formatAlertMessage),
    "sendDiscordAlert": (()=>sendDiscordAlert)
});
async function sendDiscordAlert(webhookUrl, alert) {
    if (!webhookUrl || !webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
        console.error('Invalid Discord webhook URL');
        return false;
    }
    const directionEmoji = alert.direction === 'up' ? '🟢' : '🔴';
    const probabilityLabel = alert.probability.toUpperCase();
    const confidenceBar = '█'.repeat(Math.floor(alert.confidence / 10));
    const embed = {
        title: `${directionEmoji} BTC Reversal Signal - ${alert.direction.toUpperCase()}`,
        description: `**${probabilityLabel} Probability Setup**`,
        color: alert.direction === 'up' ? 0x00ff00 : 0xff0000,
        fields: [
            {
                name: '💰 Price',
                value: `$${alert.price.toFixed(2)}`,
                inline: true
            },
            {
                name: '📊 Confidence',
                value: `${alert.confidence}%\n${confidenceBar}`,
                inline: true
            },
            {
                name: '⏰ Time',
                value: new Date(alert.timestamp).toLocaleString(),
                inline: true
            },
            {
                name: '🎯 Direction',
                value: alert.direction === 'up' ? 'BULLISH REVERSAL' : 'BEARISH REVERSAL',
                inline: false
            }
        ],
        footer: {
            text: 'UCS Extreme Snap Back | BTC Reversal System'
        },
        timestamp: new Date(alert.timestamp).toISOString()
    };
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'BTC Reversal Bot',
                avatar_url: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                embeds: [
                    embed
                ]
            })
        });
        if (!response.ok) {
            throw new Error(`Discord webhook failed: ${response.statusText}`);
        }
        console.log('✅ Discord alert sent successfully');
        return true;
    } catch (error) {
        console.error('❌ Failed to send Discord alert:', error);
        return false;
    }
}
function formatAlertMessage(alert) {
    const direction = alert.direction === 'up' ? 'BUY' : 'SELL';
    const emoji = alert.direction === 'up' ? '🟢' : '🔴';
    return `${emoji} ${direction} Signal | $${alert.price.toFixed(2)} | ${alert.confidence}% confidence | ${alert.probability.toUpperCase()} prob`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>BTCDashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$components$2f$TradingChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/components/TradingChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$components$2f$CombinedSignalAlerts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/components/CombinedSignalAlerts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$components$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/components/SettingsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$components$2f$PerformanceMetrics$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/components/PerformanceMetrics.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$hooks$2f$useBTCPrice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/hooks/useBTCPrice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$ucs$2d$indicator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/lib/ucs-indicator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/lib/camarilla.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$discord$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/newpage/lib/discord.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function BTCDashboard() {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [indicatorEngine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BTCDashboard.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$ucs$2d$indicator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UCSIndicator"]()
    }["BTCDashboard.useState"]);
    const { candles, currentPrice, activeSignals, pivots, alerts, config, setCandles, addSignal, setPivots, addAlert } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBTCStore"])();
    // Initialize WebSocket connection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$hooks$2f$useBTCPrice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBTCPriceStream"])();
    // Load historical data on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BTCDashboard.useEffect": ()=>{
            const loadHistoricalData = {
                "BTCDashboard.useEffect.loadHistoricalData": async ()=>{
                    try {
                        const historical = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$hooks$2f$useBTCPrice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchHistoricalCandles"])(1000); // Will fetch 48 hours
                        if (historical.length > 0) {
                            setCandles(historical);
                            // Calculate initial pivots (daily, weekly, monthly)
                            const dailyCandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyCandle"])(historical);
                            const weeklyCandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWeeklyCandle"])(historical);
                            const monthlyCandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlyCandle"])(historical);
                            if (dailyCandle) {
                                const initialPivots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCamarillaPivots"])(dailyCandle, weeklyCandle || undefined, monthlyCandle || undefined);
                                setPivots(initialPivots);
                            }
                        }
                    } catch (error) {
                        console.error('Failed to load historical data:', error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["BTCDashboard.useEffect.loadHistoricalData"];
            loadHistoricalData();
        }
    }["BTCDashboard.useEffect"], [
        setCandles,
        setPivots
    ]);
    // Run indicator ONCE on initial load only
    const [signalsCalculated, setSignalsCalculated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BTCDashboard.useEffect": ()=>{
            if (candles.length < 32 || signalsCalculated) return; // Skip if already calculated
            console.log('Calculating UCS signals for', candles.length, 'candles...');
            const { signals } = indicatorEngine.calculate(candles, {
                highProb: config.enableHighProb,
                midProb: config.enableMidProb,
                lowProb: config.enableLowProb
            });
            console.log('Found', signals.length, 'signals');
            // Add all signals at once
            signals.forEach({
                "BTCDashboard.useEffect": (signal)=>{
                    const isDuplicate = activeSignals.some({
                        "BTCDashboard.useEffect.isDuplicate": (s)=>s.time === signal.time && s.type === signal.type
                    }["BTCDashboard.useEffect.isDuplicate"]);
                    if (!isDuplicate && signal.confidence >= config.alertThreshold) {
                        addSignal(signal);
                        const alert = {
                            id: `${signal.time}-${signal.type}`,
                            timestamp: signal.time,
                            price: signal.price,
                            direction: signal.type === 'buy' ? 'up' : 'down',
                            confidence: signal.confidence,
                            probability: signal.probability,
                            outcome: 'pending'
                        };
                        addAlert(alert);
                        // Send Discord notification only for new real-time signals
                        if (signal.time > Date.now() - 60000 && config.discordWebhook) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$discord$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendDiscordAlert"])(config.discordWebhook, alert);
                        }
                    }
                }
            }["BTCDashboard.useEffect"]);
            setSignalsCalculated(true);
        }
    }["BTCDashboard.useEffect"], [
        candles.length >= 32
    ]); // Only run when we have enough candles
    // Recalculate pivots only once per day (check every minute, but only update if day changed)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BTCDashboard.useEffect": ()=>{
            if (candles.length === 0) return;
            const checkAndUpdatePivots = {
                "BTCDashboard.useEffect.checkAndUpdatePivots": ()=>{
                    const dailyCandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyCandle"])(candles);
                    const weeklyCandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWeeklyCandle"])(candles);
                    const monthlyCandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlyCandle"])(candles);
                    if (dailyCandle) {
                        const newPivots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$camarilla$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCamarillaPivots"])(dailyCandle, weeklyCandle || undefined, monthlyCandle || undefined);
                        // Only update if pivots actually changed (different day)
                        if (JSON.stringify(newPivots) !== JSON.stringify(pivots)) {
                            console.log('Pivots updated for new day/week/month');
                            setPivots(newPivots);
                        }
                    }
                }
            }["BTCDashboard.useEffect.checkAndUpdatePivots"];
            checkAndUpdatePivots();
        }
    }["BTCDashboard.useEffect"], [
        candles,
        pivots,
        setPivots
    ]);
    const latestSignal = activeSignals.length > 0 ? activeSignals[activeSignals.length - 1] : null;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-black flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/page.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-400",
                        children: "Loading BTC Dashboard..."
                    }, void 0, false, {
                        fileName: "[project]/app/newpage/page.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/newpage/page.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/newpage/page.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1920px] mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent",
                                    children: "BTC Reversal Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/app/newpage/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 mt-2",
                                    children: "UCS Extreme Snap Back • Real-time 1-min candles • Camarilla Pivots"
                                }, void 0, false, {
                                    fileName: "[project]/app/newpage/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/newpage/page.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 bg-gray-900 px-6 py-3 rounded-xl border border-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 bg-green-500 rounded-full animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/app/newpage/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-gray-300",
                                    children: "Live"
                                }, void 0, false, {
                                    fileName: "[project]/app/newpage/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/newpage/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/newpage/page.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-900 rounded-xl p-6 border border-gray-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$components$2f$TradingChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TradingChart"], {
                                candles: candles,
                                signals: activeSignals,
                                pivots: pivots,
                                currentPrice: currentPrice
                            }, void 0, false, {
                                fileName: "[project]/app/newpage/page.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/newpage/page.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$components$2f$CombinedSignalAlerts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CombinedSignalAlerts"], {
                                    latestSignal: latestSignal,
                                    currentPrice: currentPrice,
                                    alerts: alerts
                                }, void 0, false, {
                                    fileName: "[project]/app/newpage/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$components$2f$PerformanceMetrics$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerformanceMetrics"], {
                                    alerts: alerts
                                }, void 0, false, {
                                    fileName: "[project]/app/newpage/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$components$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettingsPanel"], {}, void 0, false, {
                                    fileName: "[project]/app/newpage/page.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/newpage/page.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/newpage/page.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500 text-sm py-4 border-t border-gray-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Powered by Binance WebSocket • UCS Extreme Snap Back Indicator • Camarilla Pivot Points"
                        }, void 0, false, {
                            fileName: "[project]/app/newpage/page.tsx",
                            lineNumber: 208,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs",
                            children: "Trading involves risk. Always do your own research."
                        }, void 0, false, {
                            fileName: "[project]/app/newpage/page.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/newpage/page.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/newpage/page.tsx",
            lineNumber: 158,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/newpage/page.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_s(BTCDashboard, "H0QWExVlQjma6ANe+QvQIKhaZXI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBTCStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$newpage$2f$hooks$2f$useBTCPrice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBTCPriceStream"]
    ];
});
_c = BTCDashboard;
var _c;
__turbopack_refresh__.register(_c, "BTCDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/newpage/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_newpage_d7cbb7._.js.map
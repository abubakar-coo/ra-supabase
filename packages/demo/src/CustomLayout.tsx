import * as React from 'react';
import {
    AppBar,
    Layout,
    LayoutProps,
    usePermissions,
} from 'react-admin';
import { Box, Typography, Button, Chip, Divider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate, useLocation } from 'react-router-dom';

// ─── Custom Top Bar ────────────────────────────────────────────────
const OtokoAppBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/' },
        { label: 'Deposits', icon: <AccountBalanceWalletIcon fontSize="small" />, path: '/deposits' },
        { label: 'Expenses', icon: <ReceiptLongIcon fontSize="small" />, path: '/expenses' },
        { label: 'Reports', icon: <BarChartIcon fontSize="small" />, path: '/reports' },
    ];

    return (
        <AppBar
            sx={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
                padding: 0,
            }}
            toolbar={
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        px: 2,
                        py: 0.5,
                        gap: 2,
                    }}
                >
                    {/* ── Logo & Brand ───────────────────── */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            cursor: 'pointer',
                            mr: 3,
                        }}
                        onClick={() => navigate('/')}
                    >
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 20px rgba(99,102,241,0.5)',
                            }}
                        >
                            <TrendingUpIcon sx={{ color: '#fff', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: '1.25rem',
                                    letterSpacing: '0.05em',
                                    background: 'linear-gradient(90deg, #a5b4fc, #e879f9)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 1.1,
                                }}
                            >
                                OTOKO
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '0.62rem',
                                    color: 'rgba(148,163,184,0.9)',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    fontWeight: 500,
                                    lineHeight: 1,
                                }}
                            >
                                Expense Management
                            </Typography>
                        </Box>
                    </Box>

                    {/* ── Divider ────────────────────────── */}
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: 'rgba(99,102,241,0.3)', mx: 1 }}
                    />

                    {/* ── Navigation Tabs ─────────────────── */}
                    <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                        {navItems.map((item) => {
                            const isActive =
                                item.path === '/'
                                    ? location.pathname === '/'
                                    : location.pathname.startsWith(item.path);
                            return (
                                <Button
                                    key={item.path}
                                    startIcon={item.icon}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        color: isActive ? '#a5b4fc' : 'rgba(148,163,184,0.8)',
                                        backgroundColor: isActive
                                            ? 'rgba(99,102,241,0.15)'
                                            : 'transparent',
                                        borderRadius: '10px',
                                        px: 2,
                                        py: 0.8,
                                        fontSize: '0.82rem',
                                        fontWeight: isActive ? 700 : 500,
                                        textTransform: 'none',
                                        border: isActive
                                            ? '1px solid rgba(99,102,241,0.4)'
                                            : '1px solid transparent',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(99,102,241,0.12)',
                                            color: '#a5b4fc',
                                            borderColor: 'rgba(99,102,241,0.3)',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Box>

                    {/* ── Status Chip ─────────────────────── */}
                    <Chip
                        label="● Live"
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(34,197,94,0.15)',
                            color: '#4ade80',
                            border: '1px solid rgba(34,197,94,0.3)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            height: 26,
                        }}
                    />
                </Box>
            }
        />
    );
};

// ─── Custom Layout ─────────────────────────────────────────────────
export const OtokoLayout = (props: LayoutProps) => (
    <Layout
        {...props}
        appBar={OtokoAppBar}
        sx={{
            '& .RaLayout-content': {
                backgroundColor: '#0f172a',
                minHeight: '100vh',
            },
            '& .RaSidebar-root': {
                backgroundColor: '#1e293b',
                borderRight: '1px solid rgba(99,102,241,0.2)',
            },
            '& .RaMenuItemLink-root': {
                color: 'rgba(148,163,184,0.9)',
                '&:hover': {
                    backgroundColor: 'rgba(99,102,241,0.1)',
                    color: '#a5b4fc',
                },
                '&.RaMenuItemLink-active': {
                    backgroundColor: 'rgba(99,102,241,0.15)',
                    color: '#a5b4fc',
                    borderRight: '3px solid #6366f1',
                },
            },
        }}
    />
);

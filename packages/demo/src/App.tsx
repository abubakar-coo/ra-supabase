import * as React from 'react';
import {
    Admin,
    Resource,
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    DateInput,
    SelectInput,
    required,
    EditButton,
    DeleteButton,
    TopToolbar,
    CreateButton,
    ExportButton,
    FilterButton,
    CustomRoutes,
} from 'react-admin';
import { Route, BrowserRouter } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
    supabaseDataProvider,
    supabaseAuthProvider,
    LoginPage,
    SetPasswordPage,
    ForgotPasswordPage,
    defaultI18nProvider,
} from 'ra-supabase';

// ─── Supabase Setup ────────────────────────────────────────────────
const instanceUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({ instanceUrl, apiKey, supabaseClient });
const authProvider = supabaseAuthProvider(supabaseClient, {});

// ─── Expense Categories ────────────────────────────────────────────
const expenseCategories = [
    { id: 'Salaries', name: '💼 Salaries' },
    { id: 'Rent', name: '🏠 Rent' },
    { id: 'Utilities', name: '💡 Utilities (Electricity / Gas / Water)' },
    { id: 'Transport', name: '🚗 Transport' },
    { id: 'Office Supplies', name: '📎 Office Supplies' },
    { id: 'Marketing', name: '📢 Marketing' },
    { id: 'Maintenance', name: '🔧 Maintenance' },
    { id: 'Food', name: '🍱 Food & Beverages' },
    { id: 'Other', name: '📦 Other' },
];

// ─── Deposits ──────────────────────────────────────────────────────
export const DepositList = () => (
    <List
        sort={{ field: 'date', order: 'DESC' }}
        title="💰 Deposits"
        actions={
            <TopToolbar>
                <FilterButton />
                <CreateButton label="New Deposit" />
                <ExportButton />
            </TopToolbar>
        }
        filters={[
            <DateInput source="date@gte" label="From Date" alwaysOn />,
            <DateInput source="date@lte" label="To Date" alwaysOn />,
        ]}
    >
        <Datagrid bulkActionButtons={false}>
            <DateField source="date" label="Date" />
            <NumberField
                source="amount"
                label="Amount (PKR)"
                options={{ style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }}
            />
            <TextField source="description" label="Description" />
            <TextField source="created_by" label="Deposited By" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const DepositCreate = () => (
    <Create title="💰 Add New Deposit" redirect="list">
        <SimpleForm>
            <DateInput
                source="date"
                label="Date"
                defaultValue={new Date().toISOString().split('T')[0]}
                validate={required()}
                fullWidth
            />
            <NumberInput source="amount" label="Amount (PKR)" validate={required()} min={0} fullWidth />
            <TextInput source="description" label="Description" multiline rows={3} fullWidth />
            <TextInput source="created_by" label="Deposited By" fullWidth />
        </SimpleForm>
    </Create>
);

export const DepositEdit = () => (
    <Edit title="💰 Edit Deposit" redirect="list">
        <SimpleForm>
            <DateInput source="date" label="Date" validate={required()} fullWidth />
            <NumberInput source="amount" label="Amount (PKR)" validate={required()} min={0} fullWidth />
            <TextInput source="description" label="Description" multiline rows={3} fullWidth />
            <TextInput source="created_by" label="Deposited By" fullWidth />
        </SimpleForm>
    </Edit>
);

// ─── Expenses ──────────────────────────────────────────────────────
export const ExpenseList = () => (
    <List
        sort={{ field: 'date', order: 'DESC' }}
        title="💸 Expenses"
        actions={
            <TopToolbar>
                <FilterButton />
                <CreateButton label="New Expense" />
                <ExportButton />
            </TopToolbar>
        }
        filters={[
            <DateInput source="date@gte" label="From Date" alwaysOn />,
            <DateInput source="date@lte" label="To Date" alwaysOn />,
            <SelectInput
                source="category"
                label="Category"
                choices={expenseCategories}
                alwaysOn
            />,
        ]}
    >
        <Datagrid bulkActionButtons={false}>
            <DateField source="date" label="Date" />
            <NumberField
                source="amount"
                label="Amount (PKR)"
                options={{ style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }}
            />
            <TextField source="category" label="Category" />
            <TextField source="description" label="Description" />
            <TextField source="created_by" label="Spent By" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ExpenseCreate = () => (
    <Create title="💸 Add New Expense" redirect="list">
        <SimpleForm>
            <DateInput
                source="date"
                label="Date"
                defaultValue={new Date().toISOString().split('T')[0]}
                validate={required()}
                fullWidth
            />
            <NumberInput source="amount" label="Amount (PKR)" validate={required()} min={0} fullWidth />
            <SelectInput
                source="category"
                label="Category"
                choices={expenseCategories}
                validate={required()}
                fullWidth
            />
            <TextInput source="description" label="Description" multiline rows={3} fullWidth />
            <TextInput source="created_by" label="Spent By" fullWidth />
        </SimpleForm>
    </Create>
);

export const ExpenseEdit = () => (
    <Edit title="💸 Edit Expense" redirect="list">
        <SimpleForm>
            <DateInput source="date" label="Date" validate={required()} fullWidth />
            <NumberInput source="amount" label="Amount (PKR)" validate={required()} min={0} fullWidth />
            <SelectInput
                source="category"
                label="Category"
                choices={expenseCategories}
                validate={required()}
                fullWidth
            />
            <TextInput source="description" label="Description" multiline rows={3} fullWidth />
            <TextInput source="created_by" label="Spent By" fullWidth />
        </SimpleForm>
    </Edit>
);

// ─── Main App ──────────────────────────────────────────────────────
const App = () => (
    <BrowserRouter>
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={defaultI18nProvider}
            loginPage={LoginPage}
            title="🏢 Company Expense System"
            requireAuth
        >
            <Resource
                name="deposits"
                list={DepositList}
                create={DepositCreate}
                edit={DepositEdit}
                options={{ label: '💰 Deposits' }}
            />
            <Resource
                name="expenses"
                list={ExpenseList}
                create={ExpenseCreate}
                edit={ExpenseEdit}
                options={{ label: '💸 Expenses' }}
            />
            <CustomRoutes noLayout>
                <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
                <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
            </CustomRoutes>
        </Admin>
    </BrowserRouter>
);

export default App;

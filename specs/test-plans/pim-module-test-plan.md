# OrangeHRM PIM Module - Test Plan

## Overview

This test plan covers the Personnel Information Management (PIM) module of OrangeHRM 5.7. The PIM module manages employee information including personal details, employment data, and configuration settings.

**Test Environment:**
- Application: OrangeHRM 5.7 (Docker)
- Base URL: http://localhost:8080
- Test User: Admin / Admin#0630#

**Scope:**
- PIM Configuration (Optional Fields, Custom Fields, Data Import, Reporting Methods, Termination Reasons)
- Employee List (Search, View, Filtering)
- Add Employee (Basic info, Login details, Profile picture)

---

## Test Scenarios

### 1. PIM Configuration - Optional Fields

**Test Case 1.1: View Optional Fields Configuration**
- **Priority:** High
- **Prerequisites:** Logged in as Admin
- **Steps:**
  1. Navigate to PIM module
  2. Click "Configuration" in top navigation
  3. Select "Optional Fields" from dropdown
- **Expected Results:**
  - Configuration page loads successfully
  - Page displays "Optional Fields" heading
  - "Show Deprecated Fields" section is visible with checkbox for "Show Nick Name, Smoker and Military Service in Personal Details"
  - "Country Specific Information" section displays three checkboxes:
    - Show SSN field in Personal Details
    - Show SIN field in Personal Details
    - Show US Tax Exemptions menu
  - "Save" button is present and functional

**Test Case 1.2: Enable Deprecated Fields**
- **Priority:** Medium
- **Prerequisites:** On Optional Fields configuration page
- **Steps:**
  1. Check "Show Nick Name, Smoker and Military Service" checkbox
  2. Click "Save" button
  3. Navigate to an employee's Personal Details page
- **Expected Results:**
  - Success message displays after saving
  - Employee Personal Details page shows deprecated fields (Nick Name, Smoker, Military Service)

**Test Case 1.3: Enable Country Specific Fields**
- **Priority:** Medium
- **Prerequisites:** On Optional Fields configuration page
- **Steps:**
  1. Check all three country-specific checkboxes (SSN, SIN, Tax Exemptions)
  2. Click "Save" button
  3. Verify changes persist after page reload
- **Expected Results:**
  - Configuration saves successfully
  - All selected options remain checked after page reload
  - Respective fields appear in employee forms

**Test Case 1.4: Disable All Optional Fields**
- **Priority:** Medium
- **Prerequisites:** Some optional fields are enabled
- **Steps:**
  1. Uncheck all optional field checkboxes
  2. Click "Save" button
  3. Navigate to employee Personal Details
- **Expected Results:**
  - All optional fields are hidden from employee forms
  - Configuration persists after logout/login

---

### 2. PIM Configuration - Custom Fields

**Test Case 2.1: View Custom Fields List**
- **Priority:** High
- **Prerequisites:** Logged in as Admin
- **Steps:**
  1. Navigate to PIM > Configuration > Custom Fields
- **Expected Results:**
  - "Custom Fields" page loads successfully
  - Page displays "Remaining number of custom fields: 10" message
  - Table shows columns: Custom Field Name, Screen, Field Type, Actions
  - "Add" button is visible
  - "No Records Found" message displays if no custom fields exist

**Test Case 2.2: Add New Custom Field**
- **Priority:** High
- **Prerequisites:** On Custom Fields page, remaining fields > 0
- **Steps:**
  1. Click "Add" button
  2. Enter custom field name (e.g., "Employee Badge Number")
  3. Select screen (e.g., "Personal Details")
  4. Select field type (e.g., "Text or Number")
  5. Click "Save"
- **Expected Results:**
  - Add Custom Field form displays
  - All required fields are present
  - New custom field appears in the table
  - Remaining count decrements by 1
  - Custom field appears on selected employee screen

**Test Case 2.3: Edit Custom Field**
- **Priority:** Medium
- **Prerequisites:** At least one custom field exists
- **Steps:**
  1. Click edit icon (pencil) for a custom field
  2. Modify the field name
  3. Click "Save"
- **Expected Results:**
  - Edit form pre-populates with existing data
  - Changes save successfully
  - Updated field name displays in the list

**Test Case 2.4: Delete Custom Field**
- **Priority:** Medium
- **Prerequisites:** At least one custom field exists
- **Steps:**
  1. Click delete icon (trash) for a custom field
  2. Confirm deletion in the popup
- **Expected Results:**
  - Confirmation dialog appears
  - Field is removed from the list after confirmation
  - Remaining count increments by 1
  - Field is removed from employee forms

**Test Case 2.5: Validate Custom Field Limit**
- **Priority:** Low
- **Prerequisites:** None
- **Steps:**
  1. Create custom fields until the limit (10) is reached
  2. Attempt to add another custom field
- **Expected Results:**
  - "Add" button becomes disabled when limit is reached
  - Message displays "Remaining number of custom fields: 0"
  - Cannot create more than 10 custom fields

---

### 3. PIM Configuration - Data Import

**Test Case 3.1: View Data Import Page**
- **Priority:** High
- **Prerequisites:** Logged in as Admin
- **Steps:**
  1. Navigate to PIM > Configuration > Data Import
- **Expected Results:**
  - "Data Import" page loads successfully
  - Page displays import instructions:
    - Column order should not be changed
    - First Name and Last Name are compulsory
    - All date fields should be in YYYY-MM-DD format
    - Gender value should be either Male or Female
    - Each import file should be 100 records or less
    - Multiple import files may be required
  - "Sample CSV file" download link is present
  - File upload field accepts up to 1MB
  - "Upload" button is present

**Test Case 3.2: Download Sample CSV Template**
- **Priority:** High
- **Prerequisites:** On Data Import page
- **Steps:**
  1. Click "Download" link for sample CSV file
- **Expected Results:**
  - CSV file downloads successfully
  - File contains proper column headers
  - File includes example data format

**Test Case 3.3: Import Valid Employee Data**
- **Priority:** High
- **Prerequisites:** Valid CSV file with employee data prepared
- **Steps:**
  1. Click "Choose File" and select valid CSV file
  2. Click "Upload" button
  3. Wait for import to complete
- **Expected Results:**
  - File uploads successfully
  - Success message displays with number of records imported
  - Employees appear in Employee List
  - All data is correctly populated

**Test Case 3.4: Import CSV with Invalid Data**
- **Priority:** High
- **Prerequisites:** CSV file with invalid data (e.g., missing required fields)
- **Steps:**
  1. Select CSV file with missing First Name
  2. Click "Upload" button
- **Expected Results:**
  - Error message displays indicating validation failure
  - Specific error details show which rows/fields are invalid
  - No partial data is imported

**Test Case 3.5: Import CSV with Invalid Date Format**
- **Priority:** Medium
- **Prerequisites:** CSV with dates not in YYYY-MM-DD format
- **Steps:**
  1. Upload CSV with dates in MM/DD/YYYY format
  2. Click "Upload" button
- **Expected Results:**
  - Error message indicates invalid date format
  - Specifies the expected format (YYYY-MM-DD)
  - Import is rejected

**Test Case 3.6: Import File Size Validation**
- **Priority:** Medium
- **Prerequisites:** CSV file larger than 1MB
- **Steps:**
  1. Attempt to upload file > 1MB
- **Expected Results:**
  - Error message displays "File size exceeds 1MB limit"
  - Upload is rejected

**Test Case 3.7: Import File with >100 Records**
- **Priority:** Medium
- **Prerequisites:** CSV file with 101+ employee records
- **Steps:**
  1. Upload CSV with 150 records
  2. Click "Upload" button
- **Expected Results:**
  - Warning message about 100 record limit
  - Either imports first 100 or rejects entire file (per system design)

---

### 4. PIM Configuration - Reporting Methods

**Test Case 4.1: View Reporting Methods List**
- **Priority:** High
- **Prerequisites:** Logged in as Admin
- **Steps:**
  1. Navigate to PIM > Configuration > Reporting Methods
- **Expected Results:**
  - "Reporting Methods" page loads successfully
  - Table displays existing reporting methods
  - Default methods visible: "Direct" and "Indirect"
  - Each row has edit and delete action buttons
  - "Add" button is present
  - Record count displays (e.g., "(2) Records Found")

**Test Case 4.2: Add New Reporting Method**
- **Priority:** High
- **Prerequisites:** On Reporting Methods page
- **Steps:**
  1. Click "Add" button
  2. Enter reporting method name (e.g., "Matrix")
  3. Click "Save"
- **Expected Results:**
  - Add form displays with Name field
  - New reporting method appears in the list
  - Record count increments
  - New method is available when configuring employee reporting structure

**Test Case 4.3: Edit Reporting Method**
- **Priority:** Medium
- **Prerequisites:** At least one reporting method exists
- **Steps:**
  1. Click edit icon for a reporting method
  2. Modify the name
  3. Click "Save"
- **Expected Results:**
  - Edit form pre-populates with current name
  - Updated name displays in the list
  - Changes reflect in employee reporting configurations

**Test Case 4.4: Delete Reporting Method**
- **Priority:** Medium
- **Prerequisites:** Custom reporting method exists (not default Direct/Indirect)
- **Steps:**
  1. Click delete icon for a custom reporting method
  2. Confirm deletion
- **Expected Results:**
  - Confirmation dialog appears
  - Method is removed from list
  - Record count decrements
  - Method is no longer available in employee configurations

**Test Case 4.5: Delete Default Reporting Method**
- **Priority:** Low
- **Prerequisites:** Default reporting methods (Direct/Indirect) exist
- **Steps:**
  1. Attempt to delete "Direct" or "Indirect" method
- **Expected Results:**
  - System either prevents deletion or shows warning
  - Default methods remain protected

---

### 5. PIM Configuration - Termination Reasons

**Test Case 5.1: View Termination Reasons List**
- **Priority:** High
- **Prerequisites:** Logged in as Admin
- **Steps:**
  1. Navigate to PIM > Configuration > Termination Reasons
- **Expected Results:**
  - "Termination Reasons" page loads successfully
  - Table displays existing termination reasons
  - Default reasons visible include:
    - Contract Not Renewed
    - Deceased
    - Dismissed
    - Laid-off
    - Other
    - Physically Disabled/Compensated
    - Resigned
    - Resigned - Company Requested
    - Resigned - Self Proposed
    - Retired
  - Record count shows "(10) Records Found"
  - Each row has edit and delete action buttons
  - "Add" button is present

**Test Case 5.2: Add New Termination Reason**
- **Priority:** High
- **Prerequisites:** On Termination Reasons page
- **Steps:**
  1. Click "Add" button
  2. Enter termination reason name (e.g., "End of Contract")
  3. Click "Save"
- **Expected Results:**
  - Add form displays with Name field
  - New reason appears in the list
  - Record count increments
  - New reason is available when terminating employees

**Test Case 5.3: Edit Termination Reason**
- **Priority:** Medium
- **Prerequisites:** At least one termination reason exists
- **Steps:**
  1. Click edit icon for a termination reason
  2. Modify the name
  3. Click "Save"
- **Expected Results:**
  - Edit form pre-populates with current name
  - Updated name displays in the list
  - Changes reflect when selecting termination reasons

**Test Case 5.4: Delete Termination Reason**
- **Priority:** Medium
- **Prerequisites:** Custom termination reason exists
- **Steps:**
  1. Click delete icon for a termination reason
  2. Confirm deletion
- **Expected Results:**
  - Confirmation dialog appears
  - Reason is removed from list
  - Record count decrements

**Test Case 5.5: Delete Used Termination Reason**
- **Priority:** High
- **Prerequisites:** Termination reason is assigned to at least one employee
- **Steps:**
  1. Attempt to delete a termination reason that's in use
  2. Confirm deletion
- **Expected Results:**
  - System displays warning that reason is in use
  - Either prevents deletion or removes assignment from employees
  - Data integrity is maintained

---

### 6. Employee List - Search and Filter

**Test Case 6.1: View Employee List**
- **Priority:** High
- **Prerequisites:** Logged in as Admin
- **Steps:**
  1. Navigate to PIM > Employee List
- **Expected Results:**
  - "Employee Information" page loads successfully
  - Search form displays with fields:
    - Employee Name (autocomplete)
    - Employee Id
    - Employment Status (dropdown)
    - Include (dropdown with "Current Employees Only" default)
    - Supervisor Name (autocomplete)
    - Job Title (dropdown)
    - Sub Unit (dropdown)
  - "Reset" and "Search" buttons are present
  - Employee table displays with columns:
    - Checkbox (for bulk selection)
    - Id
    - First (& Middle) Name
    - Last Name
    - Job Title
    - Employment Status
    - Sub Unit
    - Supervisor
    - Actions
  - Record count displays (e.g., "(1) Record Found")
  - "Add" button is visible

**Test Case 6.2: Search by Employee Name**
- **Priority:** High
- **Prerequisites:** Multiple employees exist in the system
- **Steps:**
  1. Click in "Employee Name" field
  2. Type first few characters of an employee's name
  3. Select employee from autocomplete suggestions
  4. Click "Search" button
- **Expected Results:**
  - Autocomplete displays matching employee names
  - Selected employee appears in search results
  - Other employees are filtered out
  - Record count updates correctly

**Test Case 6.3: Search by Employee ID**
- **Priority:** High
- **Prerequisites:** Know an existing employee ID (e.g., "0001")
- **Steps:**
  1. Enter employee ID in "Employee Id" field
  2. Click "Search" button
- **Expected Results:**
  - Only employee with matching ID displays
  - Record count shows "(1) Record Found"
  - Employee details are correct

**Test Case 6.4: Filter by Employment Status**
- **Priority:** Medium
- **Prerequisites:** Employees with different employment statuses exist
- **Steps:**
  1. Click "Employment Status" dropdown
  2. Select a status (e.g., "Full-Time Permanent")
  3. Click "Search" button
- **Expected Results:**
  - Only employees with selected status display
  - Record count updates accordingly
  - Employment Status column shows correct status for all results

**Test Case 6.5: Filter by Include Option**
- **Priority:** Medium
- **Prerequisites:** System has both current and past employees
- **Steps:**
  1. Click "Include" dropdown
  2. Select "Current and Past Employees"
  3. Click "Search" button
- **Expected Results:**
  - Both active and terminated employees appear in results
  - Record count increases
  - Default "Current Employees Only" can be switched back

**Test Case 6.6: Search by Supervisor Name**
- **Priority:** Medium
- **Prerequisites:** Employees have assigned supervisors
- **Steps:**
  1. Click in "Supervisor Name" field
  2. Type supervisor's name
  3. Select from autocomplete
  4. Click "Search" button
- **Expected Results:**
  - Only employees reporting to selected supervisor display
  - Supervisor column shows the selected supervisor's name
  - Record count updates correctly

**Test Case 6.7: Filter by Job Title**
- **Priority:** Medium
- **Prerequisites:** Employees have assigned job titles
- **Steps:**
  1. Click "Job Title" dropdown
  2. Select a job title
  3. Click "Search" button
- **Expected Results:**
  - Only employees with selected job title display
  - Job Title column shows correct title
  - Record count reflects filtered results

**Test Case 6.8: Filter by Sub Unit**
- **Priority:** Medium
- **Prerequisites:** Employees are assigned to different sub units
- **Steps:**
  1. Click "Sub Unit" dropdown
  2. Select a sub unit (e.g., "Engineering")
  3. Click "Search" button
- **Expected Results:**
  - Only employees in selected sub unit display
  - Sub Unit column shows correct sub unit
  - Record count updates

**Test Case 6.9: Combined Search Criteria**
- **Priority:** High
- **Prerequisites:** Multiple employees exist
- **Steps:**
  1. Select employment status "Full-Time Permanent"
  2. Select job title "Software Engineer"
  3. Select sub unit "Engineering"
  4. Click "Search" button
- **Expected Results:**
  - Only employees matching ALL criteria display
  - All filter conditions are applied (AND logic)
  - Results are accurate

**Test Case 6.10: Reset Search Filters**
- **Priority:** High
- **Prerequisites:** Search filters are applied
- **Steps:**
  1. Apply any search criteria
  2. Click "Reset" button
- **Expected Results:**
  - All search fields are cleared
  - Dropdowns return to default ("-- Select --")
  - Employee list shows all employees
  - Record count shows total employee count

**Test Case 6.11: Search with No Results**
- **Priority:** Medium
- **Prerequisites:** None
- **Steps:**
  1. Enter non-existent employee ID "9999"
  2. Click "Search" button
- **Expected Results:**
  - Message displays "No Records Found"
  - Empty table is shown
  - Record count shows "(0) Records Found"

**Test Case 6.12: Sort Employee List**
- **Priority:** Medium
- **Prerequisites:** Multiple employees exist
- **Steps:**
  1. Click on "Id" column header
  2. Observe sort order changes
  3. Click again to reverse sort
- **Expected Results:**
  - First click sorts ascending (A-Z or 0-9)
  - Second click sorts descending (Z-A or 9-0)
  - Sort indicator (arrow) appears in column header
  - All columns with sort icons are sortable

---

### 7. Employee List - View and Actions

**Test Case 7.1: View Employee Details**
- **Priority:** High
- **Prerequisites:** At least one employee exists
- **Steps:**
  1. Click on an employee row in the table
- **Expected Results:**
  - Navigates to employee's Personal Details page
  - Employee name displays as page heading
  - Profile picture is visible
  - Tabs are displayed: Personal Details, Contact Details, Emergency Contacts, Dependents, Immigration, Job, Salary, Report-to, Qualifications, Memberships
  - Personal Details form shows employee information
  - "Save" button is present

**Test Case 7.2: Navigate Employee Tabs**
- **Priority:** Medium
- **Prerequisites:** On an employee's detail page
- **Steps:**
  1. Click on "Contact Details" tab
  2. Click on "Emergency Contacts" tab
  3. Click on "Job" tab
  4. Navigate through all tabs
- **Expected Results:**
  - Each tab loads its respective content
  - URL updates to reflect current tab
  - Data is properly organized by tab
  - No errors occur when switching tabs

**Test Case 7.3: Bulk Select Employees**
- **Priority:** Medium
- **Prerequisites:** Multiple employees exist
- **Steps:**
  1. Check the header checkbox to select all employees
  2. Observe all employee rows are selected
  3. Uncheck the header checkbox
- **Expected Results:**
  - Header checkbox selects/deselects all visible employees
  - Individual row checkboxes can be toggled
  - Selected row count is accurate
  - Bulk action buttons become enabled when employees are selected

**Test Case 7.4: Individual Employee Selection**
- **Priority:** Low
- **Prerequisites:** Multiple employees exist
- **Steps:**
  1. Check individual employee checkboxes
  2. Select 3 employees
- **Expected Results:**
  - Each employee can be individually selected
  - Selection persists when scrolling/filtering
  - Bulk actions apply only to selected employees

---

### 8. Add Employee - Basic Information

**Test Case 8.1: Navigate to Add Employee Page**
- **Priority:** High
- **Prerequisites:** Logged in as Admin
- **Steps:**
  1. Navigate to PIM > Add Employee
- **Expected Results:**
  - "Add Employee" page loads successfully
  - Page heading displays "Add Employee"
  - Profile picture upload area is visible
  - Form displays fields:
    - Employee Full Name (First Name*, Middle Name, Last Name*)
    - Employee Id (auto-populated with next available ID)
  - "Create Login Details" checkbox is unchecked
  - "Cancel" and "Save" buttons are present
  - Required fields are marked with asterisk (*)

**Test Case 8.2: Add Employee with Minimum Required Fields**
- **Priority:** High
- **Prerequisites:** On Add Employee page
- **Steps:**
  1. Enter First Name: "John"
  2. Enter Last Name: "Doe"
  3. Accept auto-generated Employee Id
  4. Click "Save" button
- **Expected Results:**
  - Employee is created successfully
  - Redirects to employee's Personal Details page
  - Success message displays
  - Employee appears in Employee List
  - Auto-generated Employee Id is assigned

**Test Case 8.3: Add Employee with All Basic Fields**
- **Priority:** High
- **Prerequisites:** On Add Employee page
- **Steps:**
  1. Enter First Name: "Jane"
  2. Enter Middle Name: "Marie"
  3. Enter Last Name: "Smith"
  4. Modify Employee Id: "1001"
  5. Click "Save" button
- **Expected Results:**
  - Employee is created with all provided information
  - Middle name is saved correctly
  - Custom Employee Id is accepted and assigned
  - All data appears on Personal Details page

**Test Case 8.4: Validation - Missing Required Fields**
- **Priority:** High
- **Prerequisites:** On Add Employee page
- **Steps:**
  1. Leave First Name empty
  2. Enter Last Name: "Doe"
  3. Click "Save" button
- **Expected Results:**
  - Validation error appears for First Name field
  - Error message: "Required" or similar
  - Form does not submit
  - Focus returns to First Name field

**Test Case 8.5: Validation - Duplicate Employee ID**
- **Priority:** High
- **Prerequisites:** Employee with ID "0001" exists
- **Steps:**
  1. Enter First Name: "Test"
  2. Enter Last Name: "User"
  3. Change Employee Id to "0001"
  4. Click "Save" button
- **Expected Results:**
  - Validation error displays
  - Error message indicates Employee Id already exists
  - Form does not submit
  - User can modify Employee Id

**Test Case 8.6: Auto-Generated Employee ID Increment**
- **Priority:** Medium
- **Prerequisites:** Last employee ID is known
- **Steps:**
  1. Navigate to Add Employee page
  2. Observe auto-populated Employee Id
  3. Create employee and navigate back to Add Employee
  4. Observe new Employee Id
- **Expected Results:**
  - Employee Id auto-increments correctly
  - No ID conflicts occur
  - Sequential numbering is maintained

**Test Case 8.7: Cancel Add Employee**
- **Priority:** Medium
- **Prerequisites:** On Add Employee page with data entered
- **Steps:**
  1. Enter employee details
  2. Click "Cancel" button
- **Expected Results:**
  - Navigates away from Add Employee page (to Employee List)
  - No employee record is created
  - Entered data is discarded

---

### 9. Add Employee - Profile Picture

**Test Case 9.1: Upload Profile Picture - Valid Image**
- **Priority:** Medium
- **Prerequisites:** On Add Employee page, have a JPG image < 1MB
- **Steps:**
  1. Click "Choose File" in profile picture area
  2. Select valid JPG image (200x200px, < 1MB)
  3. Complete required employee fields
  4. Click "Save" button
- **Expected Results:**
  - Image preview displays in profile picture area
  - Image uploads successfully
  - Profile picture appears on employee's detail page
  - Image displays throughout the system where employee appears

**Test Case 9.2: Upload Profile Picture - PNG Format**
- **Priority:** Medium
- **Prerequisites:** On Add Employee page, have a PNG image < 1MB
- **Steps:**
  1. Upload PNG image
  2. Save employee
- **Expected Results:**
  - PNG format is accepted
  - Image displays correctly

**Test Case 9.3: Upload Profile Picture - GIF Format**
- **Priority:** Medium
- **Prerequisites:** On Add Employee page, have a GIF image < 1MB
- **Steps:**
  1. Upload GIF image
  2. Save employee
- **Expected Results:**
  - GIF format is accepted
  - Image displays correctly (if animated, first frame is used)

**Test Case 9.4: Upload Profile Picture - Invalid Format**
- **Priority:** Medium
- **Prerequisites:** On Add Employee page, have a BMP or TIFF file
- **Steps:**
  1. Attempt to upload BMP or TIFF image
- **Expected Results:**
  - Error message displays indicating invalid format
  - Accepted formats listed: .jpg, .png, .gif
  - Upload is rejected

**Test Case 9.5: Upload Profile Picture - File Size Validation**
- **Priority:** Medium
- **Prerequisites:** Have an image file > 1MB
- **Steps:**
  1. Attempt to upload image larger than 1MB
- **Expected Results:**
  - Error message: "File size exceeds 1MB limit"
  - Upload is rejected
  - User is prompted to select a smaller file

**Test Case 9.6: Upload Profile Picture - Recommended Dimensions**
- **Priority:** Low
- **Prerequisites:** Have images of various dimensions
- **Steps:**
  1. Upload image with recommended 200x200px dimensions
  2. Upload very large image (e.g., 2000x2000px)
  3. Upload very small image (e.g., 50x50px)
- **Expected Results:**
  - 200x200px image displays perfectly
  - Large images are resized/cropped appropriately
  - Small images may appear pixelated but are accepted
  - Warning may display for non-recommended dimensions

**Test Case 9.7: Remove Profile Picture**
- **Priority:** Low
- **Prerequisites:** Profile picture is uploaded
- **Steps:**
  1. Click remove/delete icon on profile picture
  2. Confirm removal
- **Expected Results:**
  - Profile picture is removed
  - Default placeholder image appears
  - Change can be saved

**Test Case 9.8: Change Profile Picture**
- **Priority:** Low
- **Prerequisites:** Profile picture already uploaded
- **Steps:**
  1. Upload a new profile picture
  2. Save changes
- **Expected Results:**
  - New image replaces old image
  - Previous image is removed
  - New image displays throughout system

---

### 10. Add Employee - Login Details

**Test Case 10.1: Create Employee with Login Details**
- **Priority:** High
- **Prerequisites:** On Add Employee page
- **Steps:**
  1. Enter First Name: "Test"
  2. Enter Last Name: "Employee"
  3. Check "Create Login Details" checkbox
  4. Observe additional fields appear
  5. Enter Username: "testuser"
  6. Keep Status as "Enabled"
  7. Enter Password: "TestPass123!"
  8. Enter Confirm Password: "TestPass123!"
  9. Click "Save" button
- **Expected Results:**
  - Login details fields appear when checkbox is checked:
    - Username* (required)
    - Status (radio buttons: Enabled/Disabled)
    - Password* (required)
    - Confirm Password* (required)
  - Password strength hint displays
  - Employee and user account are created
  - User can log in with provided credentials
  - User has appropriate default permissions

**Test Case 10.2: Toggle Create Login Details Checkbox**
- **Priority:** Medium
- **Prerequisites:** On Add Employee page
- **Steps:**
  1. Check "Create Login Details" checkbox
  2. Observe fields appear
  3. Uncheck the checkbox
  4. Observe fields disappear
- **Expected Results:**
  - Login fields toggle visibility correctly
  - No data loss if checkbox is re-checked
  - Form adjusts layout smoothly

**Test Case 10.3: Validation - Missing Username**
- **Priority:** High
- **Prerequisites:** Create Login Details is checked
- **Steps:**
  1. Enter employee details
  2. Check "Create Login Details"
  3. Leave Username field empty
  4. Enter password and confirm password
  5. Click "Save" button
- **Expected Results:**
  - Validation error for Username field
  - Error message: "Required"
  - Form does not submit

**Test Case 10.4: Validation - Duplicate Username**
- **Priority:** High
- **Prerequisites:** User with username "admin" exists
- **Steps:**
  1. Enter employee details
  2. Check "Create Login Details"
  3. Enter Username: "Admin" (case insensitive)
  4. Enter valid password
  5. Click "Save" button
- **Expected Results:**
  - Validation error displays
  - Error message: "Username already exists" or similar
  - Form does not submit
  - User can modify username

**Test Case 10.5: Validation - Password Mismatch**
- **Priority:** High
- **Prerequisites:** Create Login Details is checked
- **Steps:**
  1. Enter employee details
  2. Enter Username: "newuser"
  3. Enter Password: "Password123!"
  4. Enter Confirm Password: "Password456!"
  5. Click "Save" button
- **Expected Results:**
  - Validation error displays
  - Error message: "Passwords do not match"
  - Form does not submit
  - Focus on Confirm Password field

**Test Case 10.6: Validation - Weak Password**
- **Priority:** Medium
- **Prerequisites:** Create Login Details is checked
- **Steps:**
  1. Enter employee details
  2. Enter Username: "newuser"
  3. Enter Password: "123"
  4. Enter Confirm Password: "123"
  5. Click "Save" button
- **Expected Results:**
  - Validation error for weak password
  - Error message suggests strong password requirements
  - Password hint is visible: "For a strong password, please use a hard to guess combination of text with upper and lower case characters, symbols and numbers"
  - Form does not submit until strong password is provided

**Test Case 10.7: Create Login - Disabled Status**
- **Priority:** Medium
- **Prerequisites:** On Add Employee page
- **Steps:**
  1. Enter employee details
  2. Check "Create Login Details"
  3. Enter Username: "disableduser"
  4. Select Status: "Disabled"
  5. Enter valid password
  6. Click "Save" button
  7. Attempt to log in with created credentials
- **Expected Results:**
  - Employee and user account are created
  - User account is in disabled state
  - Login attempt fails with "Account disabled" message
  - Account can be enabled later through Admin module

**Test Case 10.8: Create Login - Enabled Status (Default)**
- **Priority:** High
- **Prerequisites:** On Add Employee page
- **Steps:**
  1. Enter employee details
  2. Check "Create Login Details"
  3. Enter Username: "enableduser"
  4. Keep "Enabled" radio button selected (default)
  5. Enter valid password
  6. Click "Save" button
  7. Log out and log in with new credentials
- **Expected Results:**
  - "Enabled" is selected by default
  - User account is created in active state
  - User can successfully log in
  - User sees appropriate dashboard based on role

**Test Case 10.9: Password Field Masking**
- **Priority:** Low
- **Prerequisites:** Create Login Details is checked
- **Steps:**
  1. Enter password in Password field
  2. Observe characters are masked
  3. Enter password in Confirm Password field
  4. Observe masking
- **Expected Results:**
  - Password characters display as dots/asterisks
  - Confirm Password characters are also masked
  - Password strength may be indicated visually
  - Optional show/hide password toggle may be present

**Test Case 10.10: Username Format Validation**
- **Priority:** Medium
- **Prerequisites:** Create Login Details is checked
- **Steps:**
  1. Test various username formats:
     - With spaces: "test user"
     - With special characters: "test@user"
     - With numbers: "test123"
     - Very short: "ab"
     - Very long: 50+ characters
- **Expected Results:**
  - System accepts valid username formats per specification
  - Rejects invalid formats with appropriate error messages
  - Minimum/maximum length requirements are enforced

---

## Test Execution Notes

### Prerequisites
1. OrangeHRM Docker environment is running
2. Database is in clean state or test data is properly set up
3. Admin credentials are available

### Test Data Requirements
- Multiple employee records with various attributes
- Different employment statuses
- Various job titles and sub units
- Supervisor relationships
- Custom fields (for configuration tests)

### Test Environment Reset
Between test scenarios, consider:
- Resetting optional field configurations
- Removing test custom fields
- Cleaning up test employee records
- Restoring default reporting methods and termination reasons

### Out of Scope
- Reports functionality (covered in separate test plan)
- Advanced employee data tabs (detailed testing in separate plan)
- Performance testing
- Security testing
- API testing
- Mobile responsiveness

---

## Defect Tracking

All defects found during testing should be logged with:
- Test Case ID
- Steps to reproduce
- Expected vs Actual results
- Screenshots/videos
- Environment details
- Severity and Priority

---

## Success Criteria

- All High priority test cases pass
- 95%+ of Medium priority test cases pass
- No critical defects open
- All data validation works correctly
- User workflows are intuitive and complete
- Configuration changes persist correctly

---

**Document Version:** 1.0
**Created:** 2025-01-21
**Based on:** OrangeHRM 5.7 (Docker environment exploration)

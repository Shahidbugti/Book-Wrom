# LIBRARY SEARCH SYSTEM

**Prepared by:**
*   Wali Ahmed Asif (66284)
*   Rao Taha Ali (66329)
*   Shahid Bugti (66354)

**Course:** Human–Computer Interaction (HCI)
**Instructor:** Sir Rizwan Munir

---

## Table of Contents
1.  [Introduction](#1-introduction)
    *   [1.1 Purpose](#11-purpose)
    *   [1.2 Scope](#12-scope)
    *   [1.3 Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    *   [1.4 References](#14-references)
    *   [1.5 Overview](#15-overview)
2.  [The Process](#2-the-process)
    *   [2.1 Stakeholders](#21-stakeholders)
    *   [2.2 Team Architecture](#22-team-architecture)
    *   [2.3 Sources of Requirements](#23-sources-of-requirements)
3.  [Requirements Description](#3-requirements-description)
    *   [3.1 Enterprise Requirements](#31-enterprise-requirements)
    *   [3.2 System Functional Requirements](#32-system-functional-requirements)
    *   [3.3 System Non-Functional Requirements](#33-system-non-functional-requirements)
4.  [System Diagrams](#4-system-diagrams)
5.  [Issues](#5-issues)
6.  [Ambiguous Statements](#6-ambiguous-statements)
7.  [Incorrect Identification](#7-incorrect-identification)
8.  [Resolution Summary](#8-resolution-summary)
9.  [Acceptance Signatures](#9-acceptance-signatures)

---

## 1. Introduction

The Library Search System (LSS) at Iqra University is a comprehensive digital platform developed to enhance the process of locating, reserving, and managing library resources for both students and faculty members. Traditionally, library operations at the university relied heavily on manual catalog searches and in-person verification of book availability, which often resulted in inefficiency, time delays, and user frustration. The proposed LSS addresses these challenges by introducing a centralized, user-friendly system that provides instant access to the library’s entire collection through an interactive web-based interface.

The system integrates Human–Computer Interaction (HCI) principles to ensure ease of use, efficient navigation, and a visually appealing user experience. By focusing on intuitive interface design, clear feedback mechanisms, and accessibility compliance, the LSS aims to accommodate users of varying technical proficiency. Students can search for books by title, author, keyword, or subject area, while faculty members can quickly locate course-related or research-specific materials. Librarians benefit from streamlined management features that allow them to add, update, or remove library records without technical complexity.

The LSS also enhances the overall academic environment by reducing manual dependency, minimizing administrative errors, and allowing real-time book tracking. It supports scalability for future integration with digital resources such as e-books, journals, and research papers. In alignment with Iqra University’s vision of adopting modern technological solutions for academic excellence, this system represents a step toward a fully digital and accessible learning ecosystem.

Moreover, the system emphasizes security and reliability, incorporating authentication mechanisms to ensure only authorized users can perform sensitive operations like reservations or inventory management. With continuous uptime, cross-platform support, and responsive design, the Library Search System serves as a sustainable and efficient tool that enhances information access, promotes self-service learning, and optimizes library resource utilization for the entire university community.

### 1.1 Purpose
The purpose of this Software Requirements Specification (SRS) is to clearly define the goals, functional behavior, and performance expectations of the Library Search System (LSS) developed for Iqra University. This document serves as a blueprint for the development team, project stakeholders, and evaluators, ensuring that all parties share a unified understanding of the system’s objectives, architecture, and user requirements.

The SRS outlines how the system will assist students, faculty, and librarians in accessing and managing library resources efficiently through an intuitive, web-based interface. It emphasizes functionality, ensuring that core tasks such as searching, viewing, and reserving books are implemented accurately; usability, ensuring that interactions remain simple and effective for users of varying technical backgrounds; and design quality, ensuring that the interface adheres to Human–Computer Interaction (HCI) principles and industry standards.

Additionally, this document serves as a foundation for testing and validation, defining measurable criteria for success, such as response time, accuracy of search results, and ease of navigation. It also provides guidance for future system enhancements, including integration with digital library services, online journals, and institutional databases. In summary, the purpose of this SRS is to ensure that the LSS meets academic, technical, and usability standards while aligning with Iqra University’s commitment to providing innovative and accessible educational technologies.

### 1.2 Scope
The Library Search System (LSS) is designed to automate and streamline the traditional library operations of Iqra University, replacing manual cataloging and search processes with a centralized digital solution. The primary scope of the system includes enabling users to search for books by title, author, subject, or keyword, check real-time availability, and reserve or issue books online through secure login access.

For students and faculty members, the system provides an intuitive interface that allows efficient exploration of the library’s entire collection. It also generates personalized dashboards for users to manage reservations, view borrowing history, and receive notifications for due dates or book returns. For librarians and administrators, the system simplifies catalog management, supports bulk record updates, and ensures real-time synchronization of data between users and the library’s database.

The scope of this project also extends to the design and performance aspects of the system. It ensures cross-platform compatibility, allowing access from desktops, laptops, tablets, and smartphones. The system’s scalable architecture is built to accommodate future expansion, such as integration with digital media, e-books, research repositories, or other academic systems.

In essence, the LSS will significantly reduce manual effort, improve operational efficiency, and enhance the overall user experience for both library users and staff. Its goal is to foster a modern, automated, and user-centric environment that supports Iqra University’s academic objectives and promotes effective resource utilization.

### 1.3 Definitions, Acronyms, and Abbreviations
*   **HCI** – A multidisciplinary field of study that focuses on the design, evaluation, and implementation of interactive computing systems for human use. In this project, HCI principles are applied to ensure that the Library Search System (LSS) provides an efficient, intuitive, and accessible experience for all users, minimizing cognitive load and enhancing task performance.
*   **UX** – Refers to the overall experience and satisfaction a user gains while interacting with the system. In the context of the LSS, UX encompasses usability, accessibility, performance, and emotional design—ensuring that users can efficiently locate and reserve books with minimal frustration and maximum satisfaction.
*   **UI** – The graphical and interactive layer through which users engage with the system. The UI of the LSS will include elements such as search bars, buttons, forms, menus, and icons, all designed to promote clarity, visual appeal, and ease of navigation.
*   **LSS** – The main software system described in this document. It is an interactive, web-based application designed to facilitate efficient searching, reservation, and management of library resources within Iqra University. The LSS serves both as a front-end tool for users and a back-end management system for library staff.
*   **SRS** – A formal document that defines the intended functionality, design constraints, and performance expectations of the software being developed. The SRS serves as a reference point for developers, testers, and stakeholders throughout the software development lifecycle, ensuring that the final system meets its specified objectives and user requirements.

### 1.4 References
*   IEEE Std 830-1998: Software Requirements Specification
*   Nielsen, J. (1995). 10 Usability Heuristics for UI Design.

### 1.5 Overview
This document provides a complete and structured representation of all specifications, requirements, and design considerations for the Library Search System (LSS) at Iqra University. Following the IEEE SRS standard (IEEE Std 830-1998), the document is organized to guide stakeholders through every phase of system development — from requirement identification to implementation and testing.

It begins with an introduction that defines the project’s purpose, scope, and key terminologies. Subsequent sections describe the development process, identifying the main stakeholders, team structure, and requirement sources. The Requirements Description section elaborates on both functional and non-functional requirements that define the core operations, usability standards, and performance benchmarks of the system.

Furthermore, detailed system diagrams illustrate the overall architecture, data flow, and user interaction models to ensure transparency in design and functionality. Later sections address potential issues, ambiguous statements, and incorrect identifications, followed by their respective resolutions to enhance the system’s consistency and reliability.

Overall, this SRS acts as a foundation for the design, coding, and evaluation phases of the project. It ensures that the Library Search System meets academic goals, supports user needs, and adheres to software engineering best practices for usability, reliability, and performance.

---

## 2. The Process

The process of developing the Library Search System (LSS) involves systematic stages of requirement collection, stakeholder engagement, design structuring, and validation. The aim is to ensure that the system not only meets technical expectations but also aligns with user experience and accessibility goals guided by Human–Computer Interaction (HCI) principles.

This section outlines the key stakeholders involved, the structure of the project team, and the primary sources from which requirements were gathered. Each of these elements plays a crucial role in ensuring the successful planning and execution of the system.

### 2.1 Stakeholders
The success of the Library Search System depends on the active participation and feedback of its key stakeholders. Each group contributes to the system from a unique perspective:
*   **Students:** The primary end-users of the system. They use the platform to search, view, and reserve books, check due dates, and manage their borrowing history. Their feedback is vital for evaluating usability and ensuring that the system remains intuitive and efficient for everyday use.
*   **Faculty Members:** They rely on the system to locate academic and research materials that support teaching and research activities. Faculty input is essential in defining search filters, resource categorization, and access privileges.
*   **Librarians:** Serve as administrative users responsible for maintaining the library’s digital catalog. They handle tasks such as adding new titles, updating availability, managing reservations, and ensuring the integrity of the data stored in the system.
*   **University Administration:** Provides strategic oversight, ensures compliance with institutional policies, and allocates necessary funding and infrastructure for system implementation and maintenance.
*   **Technical Development Team:** Consists of developers, designers, and testers who are responsible for translating requirements into a functional system. They ensure that the platform meets both user expectations and institutional IT standards.

Each stakeholder’s involvement ensures that the Library Search System is user-centered, functional, and sustainable.

### 2.2 Team Architecture
The development team structure is designed to promote efficient communication, clear task allocation, and accountability throughout the project lifecycle. The main roles and responsibilities are as follows:
*   **Project Manager:** Oversees all aspects of the project, ensuring that deadlines are met, resources are efficiently utilized, and communication flows smoothly between stakeholders and team members.
*   **Software Developers:** Responsible for designing and implementing both the front-end and back-end components. They ensure the system’s core functions—such as search, reservation, and user authentication—operate seamlessly.
*   **UI/UX Designers:** Focus on interface design, ensuring that the system is easy to use, visually appealing, and compliant with usability standards. They apply HCI principles to minimize user errors and improve satisfaction.
*   **Quality Assurance (QA) Testers:** Conduct functional, usability, and performance testing to ensure that the system meets all defined requirements. They also verify that all issues identified during testing are resolved before deployment.
*   **Support and Maintenance Staff:** Provide post-deployment technical assistance, perform updates, fix bugs, and monitor system performance to maintain reliability and efficiency.

This structured team approach ensures that the system is developed collaboratively, tested thoroughly, and maintained effectively.

### 2.3 Sources of Requirements
The requirements for the Library Search System (LSS) were gathered through a structured and user-centered approach to ensure the system meets both academic and operational needs. The primary sources include:
*   **User Surveys and Interviews:** Conducted with students and faculty to identify difficulties in current library processes and gather expectations for new features such as search filters, online reservations, and account management.
*   **Librarian Feedback:** Provided insights into catalog maintenance, book tracking, and reservation workflows, helping define the administrative features of the system.
*   **Observation of Current Systems:** Analysis of existing manual and digital library procedures highlighted inefficiencies, redundant steps, and opportunities for automation.
*   **Usability and Design Guidelines:** Adopted principles from HCI standards, Nielsen’s Usability Heuristics, and IEEE SRS documentation practices to ensure the system remains user-friendly, efficient, and maintainable.

---

## 3. Requirements Description
This section provides a detailed description of the functional and non-functional requirements that define the behavior, constraints, and performance expectations of the Library Search System (LSS). These requirements ensure that the system aligns with institutional objectives, user needs, and technical standards. They have been categorized into enterprise-level, functional, and non-functional requirements to maintain clarity and traceability throughout the system development lifecycle.

### 3.1 Enterprise Requirements
The enterprise-level requirements outline the high-level operational goals and institutional needs that the Library Search System must satisfy. These requirements ensure that the system integrates seamlessly within Iqra University’s academic and technical infrastructure, providing reliability, scalability, and security.
*   **24/7 System Availability:** The LSS must be operational at all times to accommodate students and faculty who may access the library resources at different hours. Scheduled maintenance should occur during off-peak times to minimize disruption.
*   **Secure Authentication:** The system must include a secure login mechanism using encrypted credentials to protect user data. Role-based access control should differentiate between students, faculty, and librarians.
*   **Mobile and Desktop Access:** The platform must be responsive and accessible across multiple devices, including desktop computers, laptops, tablets, and smartphones, without loss of functionality.
*   **Consistent Design:** The user interface should maintain consistent design standards, layout, and color themes across all modules, improving learnability and reducing cognitive load.
*   **Scalable Performance:** The system architecture should support scalability, allowing smooth expansion of the database and user base as the university library grows over time.
*   **Data Integrity and Backup:** The system should maintain accurate and up-to-date records, with automatic backup mechanisms scheduled periodically to prevent data loss.
*   **User Privacy and Compliance:** All user data should be handled in compliance with institutional and international privacy regulations, ensuring confidentiality and ethical information management.

### 3.2 System Functional Requirements

| ID | Requirement Description | Actor |
| :--- | :--- | :--- |
| FR-1 | Search books by title, author, or keyword. | User |
| FR-2 | Display book details and availability. | System |
| FR-3 | Reserve available books. | User |
| FR-4 | Show user’s reserved books. | System |
| FR-5 | Provide feedback messages for actions. | System |

### 3.3 System Non-Functional Requirements

| Category | Requirement Description |
| :--- | :--- |
| **Usability** | Simple, clean, and consistent interface. |
| **Performance** | Search results within 3 seconds. |
| **Accessibility** | Supports all screen sizes. |
| **Reliability** | Maintains 99% uptime. |
| **Feedback** | Provides visible confirmation and error messages. |

---

## 4. System Diagrams

**Figure 1: Use Case Diagram – Library Search System**
> *[This diagram shows how users, librarians, and the system interact within the Library Search System. It highlights key actions such as searching for books, viewing details, reserving books, and managing records, clearly defining each actor’s role and system boundaries.]*

**Figure 2: System Architecture Diagram**
> *[This diagram illustrates the three main layers of the Library Search System—User Interface, Application Layer, and Database Layer—showing how user inputs flow through system logic to access and manage library data efficiently.]*

**Figure 3: System Flow Diagram**
> *[This diagram depicts the step-by-step process users follow, from logging in and searching for books to viewing details, reserving items, and logging out, demonstrating a smooth and logical interaction flow within the system.]*

---

## 5. Issues
During the development and analysis of the Library Search System (LSS), several issues were identified that required clarification and refinement to ensure accuracy, usability, and consistency across all requirements. These issues primarily arose due to vague terminology, incomplete specifications, and overlapping classifications between functional and non-functional requirements.

One of the main challenges encountered was the use of ambiguous terms such as “user-friendly” and “intuitive interface.” While these phrases communicate intent, they lack measurable parameters that can be tested or validated objectively. Similarly, early requirement drafts did not clearly distinguish between user-level features and system-level behaviors, leading to confusion during design and testing stages.

Another issue involved incomplete system metrics, such as response times and reliability percentages, which are essential for establishing measurable performance benchmarks. The absence of defined metrics initially made it difficult to evaluate the system’s efficiency and reliability under different workloads.

Moreover, communication gaps between stakeholders occasionally led to conflicting interpretations of certain requirements. For instance, while developers emphasized technical feasibility, end-users prioritized ease of use and visual appeal, which required iterative revisions to balance both perspectives.

To resolve these issues, the development team conducted multiple review sessions and requirement refinement cycles. Each requirement was analyzed for clarity, completeness, and testability, ensuring that all descriptions were quantifiable, unambiguous, and logically categorized. This process helped produce a more robust and transparent SRS document that supports smooth implementation and validation.

---

## 6. Ambiguous Statements
The initial drafts of the Library Search System (LSS) documentation contained several ambiguous statements that lacked precise and measurable definitions. Phrases such as “the system should be user-friendly,” “the interface should be intuitive,” and “the system must be fast” were too subjective to evaluate effectively during testing. Ambiguity in software requirements often leads to misinterpretations among designers, developers, and testers, resulting in inconsistent system behavior and unmet user expectations.

To address this, each ambiguous statement was redefined using quantifiable performance or usability metrics. For example:

*   **“The interface must be intuitive”** was refined to:
    > “Users must be able to complete primary actions (e.g., book search or reservation) within three clicks or less.”
*   **“The system should be user-friendly”** was rewritten as:
    > “At least 90% of first-time users should be able to perform a successful search without external guidance.”
*   **“The system must be fast”** was redefined as:
    > “Search results should be displayed within three seconds under normal network conditions.”

These revised statements transform vague design goals into measurable performance targets that can be tested during quality assurance. This not only ensures design consistency but also enables the development team to validate usability through formal metrics such as task completion time, error rate, and user satisfaction score.

---

## 7. Incorrect Identification
During the early stages of the requirements specification, some misclassifications of requirements were identified between the functional and non-functional categories. This issue emerged due to overlapping interpretations of system goals, where performance-oriented attributes were mistakenly documented as functional requirements instead of non-functional ones.

For example, scalability and system reliability were initially listed as functional requirements. However, these aspects do not define what the system does but rather how well it performs under various conditions. According to IEEE SRS standards, these characteristics should be classified as non-functional requirements because they describe quality attributes and performance behavior rather than specific user actions.

Other similar cases included the classification of “interface consistency” and “data security,” which were later corrected and moved under the non-functional category. This reclassification ensures that the system’s quality attributes are properly defined, measured, and validated separately from its operational features.

The correction process involved detailed review meetings among the project manager, developers, and QA testers, where each requirement was evaluated based on functionality, behavior, and measurable outcome. Once finalized, the revised classification improved documentation clarity and aligned the SRS structure with international software engineering standards.

Ultimately, these corrections strengthened the overall requirement specification, making it more organized, logically structured, and easier to interpret for future design, testing, and maintenance phases.

---

## 8. Resolution Summary

| Issue Type | Resolution Strategy |
| :--- | :--- |
| **Ambiguity** | Quantify subjective terms. |
| **Misclassification** | Reassign to proper requirement type. |
| **Contradiction** | Clarify expectations. |
| **Incompleteness** | Add measurable parameters. |

---

## 9. Acceptance Signatures

| Role | Signature | Date |
| :--- | :--- | :--- |
| **Project Sponsor** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_ |
| **Academic Director** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_ |
| **System Architect** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_ |
| **Quality Assurance Lead** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_ |

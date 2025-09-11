# Markdown Features Reference

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Text Formatting

**Bold text** and __also bold__

*Italic text* and _also italic_

~~Strikethrough text~~

**Bold and _nested italic_ text**

***Bold and italic text***

<sub>Subscript text</sub>

<sup>Superscript text</sup>

## Quotes

> This is a blockquote
> 
> It can span multiple lines
>
> > And can be nested

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Task Lists
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

## Code

Inline `code` with backticks

```javascript
// Code block with syntax highlighting
function greetInvestor(name) {
  console.log(`Hello, ${name}! Welcome to Gradian CRM.`);
  return {
    success: true,
    message: "Investment opportunity presented"
  };
}

// Call the function
greetInvestor("Venture Capital Partner");
```

## Links

[Gradian CRM Website](https://example.com/gradian-crm)

[Internal link to features](#lists)

## Images

![Gradian Logo](https://images.examples.com/wp-content/uploads/2024/04/Gradian.png)

## Tables

| Feature | Description | Benefit | Priority |
| ------- | ----------- | ------- | -------- |
| HCP Management | Healthcare professional relationship tracking | Improved engagement | High |
| Field Operations | GPS tracking and route optimization | 30% efficiency gain | High |
| Sample Management | Medical sample lifecycle tracking | Regulatory compliance | Medium |
| Analytics | Real-time performance dashboards | Data-driven decisions | High |
| Contract Management | Digital contract storage and compliance | Risk reduction | Medium |

## Horizontal Rules

---

***

## HTML Support

<div align="center">
  <h3>Gradian CRM</h3>
  <p>The future of healthcare sales management</p>
</div>

<details>
<summary>Click to expand technical details</summary>

- Built with React and Next.js
- Mobile-optimized interface
- Comprehensive API documentation
- Enterprise-grade security

</details> 